let network = "baobab";
const snapId = `local:${window.location.href}`;

document.getElementById("connectButton").onclick = async () => {
    try {
        await window.klaytn.enable();
        let caver = new Caver(window.klaytn);
        let accounts = await caver.klay.getAccounts();
        let address = accounts[0];
        let balance = await caver.klay.getBalance(accounts[0]);
        balance = caver.utils.convertFromPeb(balance,"KLAY");
        // await ethereum.request({
        //     method: "wallet_enable",
        //     params: [{ wallet_snap: { [snapId]: {} } }],
        // });

        // const [address, balance] = await Promise.all([
        //     ethereum.request({
        //         method: "wallet_invokeSnap",
        //         params: [snapId, { method: "klay_getAddress" }],
        //     }),
        //     ethereum.request({
        //         method: "wallet_invokeSnap",
        //         params: [
        //             snapId,
        //             { method: "klay_getBalance", params: { network } },
        //         ],
        //     }),
        // ]);

        document.getElementById("addressSpan").innerText = address;
        document.getElementById("from").value = address;
        
        document.getElementById("balanceSpan").innerText = balance;
        document.getElementById("connectButton").innerHTML = `<span>●</span> Baobab Network`;
        document.getElementById("gaslessFeature").style.display = 'block';
        document.getElementsByClassName('BytecodeExample__code')[0].innerHTML = byteCode;
        document.getElementsByClassName('AbiExample__code')[0].innerHTML = JSON.stringify(abi, null, 4);
    } catch (err) {
        console.error("Connect error: " + err.message || err);
    }
};

/* ----- Transaction ----- */

const keyString = 'keyString';
const valueString = 'valueString';

document.getElementById("signDeployerButton").onclick = async () => {
    // Deploying the smart contract with initial values
    try {
        // const signedMessage = await ethereum.request({
        //     method: "wallet_invokeSnap",
        //     params: [
        //         snapId,
        //         {
        //             method: "klay_signDeployerMessage",
        //             params: { byteCode, abi, network, keyString, valueString },
        //         },
        //     ],
        // });

        let data = byteCode + caver.abi.encodeParameters(['string','string'], [keyString, valueString]).replace("0x", "");
        const txData = {
            type: 'FEE_DELEGATED_SMART_CONTRACT_DEPLOY',
            from: document.getElementById("addressSpan").innerText,
            data,
            gas: 1000000,
            value: caver.utils.toPeb("0", 'KLAY')
        }

        const { rawTransaction } = await caver.klay.signTransaction(txData)

        document.getElementById('deployerOutput').innerHTML = rawTransaction;
    } catch (error) {
        console.error(error.message);
    }
};

document.getElementById("signFeePayerButton").onclick = async () => {
    document.getElementById("loading").style.visibility = 'visible';
    // Paying fee
    try {
        let deployTx = document.getElementById('deployerOutput').innerHTML;

        $.post({ url: "http://localhost:3000/feedelegation", 
                 data: {deployTx: deployTx }
        }).done(function(result){
            document.getElementById("loading").style.visibility = 'hidden';
            document.getElementById('deployedContract').value = result.contractAddress;
        });
        
    } catch (error) {
        console.error(error.message);
    }
};