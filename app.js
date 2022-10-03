const express = require('express')
const Caver = require('caver-js')
const app = express()
var cors = require('cors');
const port = 3000
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const nodeApiUrl = 'https://api.baobab.klaytn.net:8651';

app.get('/', async (req, res) => {
    return res.status(200).json({success: true, version: '1.0.0'});
});

app.post('/feedelegation', async (req, res) => {

    let abi = JSON.parse(req.body.abi);
    let deployTx1 = JSON.parse(req.body.deployTx);

    
    var caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, {}))

    // feepayer keyring
    let feePayerAddress = process.env.FEE_PAYER_ADDRESS;
    let feePayerPrivateKey = process.env.FEE_PAYER_PRIVATE_KEY;

    const feePayerKeyring = caver.wallet.keyring.create(feePayerAddress, feePayerPrivateKey)
    caver.wallet.add(feePayerKeyring)

    let deployTx = await parseData(abi, deployTx1, caver, feePayerKeyring);
    
    // feepayer signature
    await caver.wallet.signAsFeePayer(feePayerKeyring.address, deployTx); // Signs the transaction as a fee payer
    
    // transaction execution
    const receipt = await caver.rpc.klay.sendRawTransaction(deployTx);

    return res.status(200).json({success: true, contractAddress: receipt.contractAddress });
})

app.post('/querydata', async (req, res) => {

    let abi = JSON.parse(req.body.abi);
    let contractAddress = req.body.contractAddress;
    let keyString = req.body.keyString;

    
    var caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, {}))

    let contract = caver.contract.create(abi, contractAddress)

    // Read value string from the smart contract.
    let valueString = await contract.call('get', keyString)
    return res.status(200).json({success: true, data: valueString });
})

async function parseData(abi, deployTx1, caver, feePayerKeyring) {
    let contract2 = caver.contract.create(abi)
    let deployTx = await contract2.sign({
        from: feePayerKeyring.address,
        feeDelegation: true,
        gas: 1000000,
    }, 'constructor', "0x123", "testdata", 'testdata')

    deployTx._type = deployTx1._type;
    deployTx._from = deployTx1._from;

    deployTx._signatures = [];

    for(let i=0; i< deployTx1._signatures.length; i++) {
        deployTx._signatures.push(new caver.wallet.keyring.signatureData([
            deployTx1._signatures[i]['_v'],
            deployTx1._signatures[i]['_r'],
            deployTx1._signatures[i]['_s']
        ]));
    }

    deployTx._feePayerSignatures = [];
    for(let i=0; i< deployTx1._feePayerSignatures.length; i++) {
        deployTx._feePayerSignatures.push(new caver.wallet.keyring.signatureData([
            deployTx1._feePayerSignatures[i]['_v'],
            deployTx1._feePayerSignatures[i]['_r'],
            deployTx1._feePayerSignatures[i]['_s']
        ]));
    }

    deployTx._klaytnCall = deployTx1._klaytnCall;
    deployTx._feePayer = deployTx1._feePayer;
    
    deployTx._to = deployTx1._to;
    deployTx._value = deployTx1._value;
    deployTx._input = deployTx1._input;
    deployTx._humanReadable = deployTx1._humanReadable;
    deployTx._codeFormat = deployTx1._codeFormat;
    deployTx._chainId = deployTx1._chainId;
    deployTx._gasPrice =  deployTx1._gasPrice;
    deployTx._nonce = deployTx1._nonce;
    
    return deployTx;
}

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})