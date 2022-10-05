const express = require('express')
const Caver = require('caver-js')
const app = express()
var cors = require('cors');
var path = require('path');
const port = process.env.APP_PORT || 3000;
require('dotenv').config()

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const nodeApiUrl = process.env.RPC_URL || 'https://api.baobab.klaytn.net:8651';

app.use(express.static('public'))

app.post('/feedelegation', async (req, res) => {

    //let abi = JSON.parse(req.body.abi);
    let deployTx1 = req.body.deployTx;

    var caver = new Caver(new Caver.providers.HttpProvider(nodeApiUrl, {}))

    // feepayer keyring
    let feePayerAddress = process.env.FEE_PAYER_ADDRESS;
    let feePayerPrivateKey = process.env.FEE_PAYER_PRIVATE_KEY;

    const feePayerKeyring = caver.wallet.keyring.create(feePayerAddress, feePayerPrivateKey)
    caver.wallet.add(feePayerKeyring)

    let deployTx = caver.transaction.decode(deployTx1);

    //let deployTx = await parseData(abi, deployTx1, caver, feePayerKeyring);
    
    // feepayer signature
    await caver.wallet.signAsFeePayer(feePayerKeyring.address, deployTx); // Signs the transaction as a fee payer
    
    // transaction execution
    const receipt = await caver.rpc.klay.sendRawTransaction(deployTx);

    return res.status(200).json({success: true, contractAddress: receipt.contractAddress });
})

app.listen(port, () => {
  console.log(`Backend app listening on port ${port}`)
})