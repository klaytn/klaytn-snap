import Caver, { LegacyTransaction, SignedMessage, SingleKeyring, Transaction } from "caver-js";
import { getKeyPair } from "./account";
import { getCaver } from "./caver";
import { KeyPair, KlaytnNetwork } from "./interface";

export async function signMessage(
    network: KlaytnNetwork,
    message: string,
    // role: number,
    index?: number
): Promise<SignedMessage> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    if (!caver.wallet.isExisted(keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        caver.wallet.add(keyring);
    }

    const confirm = await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Confirm transaction",
                description: "Please confirm transaction",
                textAreaContent: `Message: ${message}`,
            },
        ],
    });

    if (!confirm) throw new Error("User rejected transaction");
    
    return caver.wallet.signMessage(
        keyPair.address,
        message,
        caver.wallet.keyring.role.roleTransactionKey,
        index
    );
}

export async function signDeployerMessage(
    abi: any,
    byteCode: string,
    network: KlaytnNetwork,
    keyString: string,
    valueString: string,
): Promise<any> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    if (!caver.wallet.isExisted(keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        caver.wallet.add(keyring);
    }

    const confirm = await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Confirm transaction",
                description: "Please confirm transaction",
                textAreaContent: `byteCode`,
            },
        ],
    });
    const contract = caver.contract.create(abi)
    if (!confirm) throw new Error("User rejected transaction");
    let resp = await contract.sign({
        from: keyPair.address,
        feeDelegation: true,
        gas: 1000000,
    }, 'constructor', byteCode, keyString, valueString);
    return JSON.stringify(resp);
}

export async function signFeePayerMessage(
    abi: any,
    deployTx: any,
    network: KlaytnNetwork,
): Promise<any> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    let deployTx1 = JSON.parse(deployTx);

    if (!caver.wallet.isExisted(keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        caver.wallet.add(keyring);
    }

    const confirm = await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Confirm transaction",
                description: "Please confirm transaction",
                textAreaContent: `deployTx`,
            },
        ],
    });
    let contract = caver.contract.create(abi)
    deployTx = await contract.sign({
        from: keyPair.address,
        feeDelegation: true,
        gas: 1000000,
    }, 'constructor', "0x123", "testdata", "testdata");

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

    await caver.wallet.signAsFeePayer(keyPair.address, deployTx);

    const receipt = await caver.rpc.klay.sendRawTransaction(deployTx)
    return receipt.contractAddress;
}

export async function getKeyString(
    abi: any,
    contractAddress: string,
    network: KlaytnNetwork,
    keyString: string
): Promise<any> {
    const caver: Caver = getCaver(network);

    let contract = caver.contract.create(abi, contractAddress)
    let valueString = await contract.call('get', keyString)
    return valueString;
}

