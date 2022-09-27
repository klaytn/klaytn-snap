// Change account address in-sync with metamask
// ethereum.on("accountsChanged", async (accounts) => {
//     address = accounts[0];
//     handleAccountChange();
// });

// Change network in-sync with metamask
// ethereum.on("chainChanged", async (_chainId) => {
//     console.log(`Change into ${_chainId}`);
//     handleAccountChange();
// });

let network = "baobab";
const snapId = `local:${window.location.href}`;

document.getElementById("connectButton").onclick = async () => {
    try {
        await ethereum.request({
            method: "wallet_enable",
            params: [{ wallet_snap: { [snapId]: {} } }],
        });

        const [address, balance] = await Promise.all([
            ethereum.request({
                method: "wallet_invokeSnap",
                params: [snapId, { method: "klay_getAddress" }],
            }),
            ethereum.request({
                method: "wallet_invokeSnap",
                params: [
                    snapId,
                    { method: "klay_getBalance", params: { network } },
                ],
            }),
        ]);

        document.getElementById("addressSpan").innerText = address;
        document.getElementById("balanceSpan").innerText = balance;
    } catch (err) {
        console.error("Connect error: " + err.message || err);
    }
};

/* ----- Account ----- */
document.getElementById("rlpEncodedButton").onclick = async () => {
    const rlpEncodedKey = document.getElementById("rlpEncodedInput").value;
    try {
        const account = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_createFromRLPEncoding",
                    params: { network, rlpEncodedKey },
                },
            ],
        });
        document.getElementById("rlpEncodedCode").innerText =
            JSON.stringify(account);
    } catch (err) {
        console.error(err.message);
    }
};

document.getElementById("accountKeyLegacyButton").onclick = async () => {
    try {
        const account = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_createWithAccountKeyLegacy",
                    params: { network },
                },
            ],
        });
        document.getElementById("accountKeyLegacyCode").innerText =
            JSON.stringify(account);
    } catch (err) {
        console.error(err.message);
    }
};

document.getElementById("accountKeyPublicButton").onclick = async () => {
    const keyPublic = document.getElementById("accountKeyPublicInput").value;
    try {
        const account = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_createWithAccountKeyPublic",
                    params: { network, keyPublic },
                },
            ],
        });
        document.getElementById("accountKeyPublicCode").innerText =
            JSON.stringify(account);
    } catch (err) {
        console.error(err.message);
    }
};

document.getElementById("accountKeyFailButton").onclick = async () => {
    try {
        const account = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_createWithAccountKeyFail",
                    params: { network },
                },
            ],
        });
        document.getElementById("accountKeyFailCode").innerText =
            JSON.stringify(account);
    } catch (err) {
        console.error(err.message);
    }
};
document.getElementById("accountKeyWeightedMultiSigButton").onclick =
    async () => {
        const keyWeightedMultiSig = document.getElementById(
            "accountKeyWeightedMultiSigInput"
        ).value;
        const publicKeyArray = keyWeightedMultiSig.split(",");
        try {
            const account = await ethereum.request({
                method: "wallet_invokeSnap",
                params: [
                    snapId,
                    {
                        method: "klay_createWithAccountKeyWeightedMultiSig",
                        params: { network, publicKeyArray },
                    },
                ],
            });
            document.getElementById(
                "accountKeyWeightedMultiSigCode"
            ).innerText = JSON.stringify(account);
        } catch (err) {
            console.error(err.message);
        }
    };

document.getElementById("accountKeyRoleBasedButton").onclick =
    async () => {
        const keyRoleBased = document.getElementById("accountKeyRoleBasedInput").value;
        const roledBasedPublicKeyArray = keyRoleBased
            .split(";")
            .map((publicKeyArray) => publicKeyArray.split(","));
        try {
            const account = await ethereum.request({
                method: "wallet_invokeSnap",
                params: [
                    snapId,
                    {
                        method: "klay_createWithAccountKeyRoleBased",
                        params: { network, roledBasedPublicKeyArray },
                    },
                ],
            });
            document.getElementById("accountKeyRoleBasedCode").innerText =
                JSON.stringify(account);
        } catch (err) {
            console.error(err.message);
        }
    };

/* ----- Transaction ----- */
document.getElementById("sendButton").onclick = async () => {
    const to = document.getElementById("toAddressInput").value;
    const value = document.getElementById("amountInput").value;
    try {
        const receipt = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_sendTransaction",
                    params: { to, value, network },
                },
            ],
        });
        const balance = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                { method: "klay_getBalance", params: { network } },
            ],
        });
        document.getElementById("transactionReceiptCode").innerText =
            JSON.stringify(receipt);
        document.getElementById("balanceSpan").innerText = balance;
    } catch (err) {
        console.error(err.message);
    }
};

document.getElementById("signButton").onclick = async () => {
    const message = document.getElementById("messageInput").value;
    try {
        const signedMessage = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_signMessage",
                    params: { message, network },
                },
            ],
        });
        document.getElementById("signedMessageCode").innerText =
            JSON.stringify(signedMessage);
    } catch (error) {
        console.error(error.message);
    }
};

const byteCode =
        '0x608060405234801561001057600080fd5b5060405161072d38038061072d8339810180604052604081101561003357600080fd5b81019080805164010000000081111561004b57600080fd5b8281019050602081018481111561006157600080fd5b815185600182028301116401000000008211171561007e57600080fd5b5050929190602001805164010000000081111561009a57600080fd5b828101905060208101848111156100b057600080fd5b81518560018202830111640100000000821117156100cd57600080fd5b5050929190505050806000836040518082805190602001908083835b6020831061010c57805182526020820191506020810190506020830392506100e9565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061015292919061015a565b5050506101ff565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061019b57805160ff19168380011785556101c9565b828001600101855582156101c9579182015b828111156101c85782518255916020019190600101906101ad565b5b5090506101d691906101da565b5090565b6101fc91905b808211156101f85760008160009055506001016101e0565b5090565b90565b61051f8061020e6000396000f3fe608060405234801561001057600080fd5b50600436106100365760003560e01c8063693ec85e1461003b578063e942b5161461016f575b600080fd5b6100f46004803603602081101561005157600080fd5b810190808035906020019064010000000081111561006e57600080fd5b82018360208201111561008057600080fd5b803590602001918460018302840111640100000000831117156100a257600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506102c1565b6040518080602001828103825283818151815260200191508051906020019080838360005b83811015610134578082015181840152602081019050610119565b50505050905090810190601f1680156101615780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6102bf6004803603604081101561018557600080fd5b81019080803590602001906401000000008111156101a257600080fd5b8201836020820111156101b457600080fd5b803590602001918460018302840111640100000000831117156101d657600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192908035906020019064010000000081111561023957600080fd5b82018360208201111561024b57600080fd5b8035906020019184600183028401116401000000008311171561026d57600080fd5b91908080601f016020809104026020016040519081016040528093929190818152602001838380828437600081840152601f19601f8201169050808301925050505050505091929192905050506103cc565b005b60606000826040518082805190602001908083835b602083106102f957805182526020820191506020810190506020830392506102d6565b6001836020036101000a03801982511681845116808217855250505050505090500191505090815260200160405180910390208054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103c05780601f10610395576101008083540402835291602001916103c0565b820191906000526020600020905b8154815290600101906020018083116103a357829003601f168201915b50505050509050919050565b806000836040518082805190602001908083835b6020831061040357805182526020820191506020810190506020830392506103e0565b6001836020036101000a0380198251168184511680821785525050505050509050019150509081526020016040518091039020908051906020019061044992919061044e565b505050565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f1061048f57805160ff19168380011785556104bd565b828001600101855582156104bd579182015b828111156104bc5782518255916020019190600101906104a1565b5b5090506104ca91906104ce565b5090565b6104f091905b808211156104ec5760008160009055506001016104d4565b5090565b9056fea165627a7a72305820adabefbb9574a90843d986f100c723c37f37e79f289b16aa527705b5341499aa0029'
const abi = [
    {
        constant: true,
        inputs: [{ name: 'key', type: 'string' }],
        name: 'get',
        outputs: [{ name: '', type: 'string' }],
        payable: false,
        stateMutability: 'view',
        type: 'function',
    },
    {
        constant: false,
        inputs: [
            { name: 'key', type: 'string' },
            { name: 'value', type: 'string' },
        ],
        name: 'set',
        outputs: [],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [
            { name: 'key', type: 'string' },
            { name: 'value', type: 'string' },
        ],
        payable: false,
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
]

const keyString = 'keyString';
const valueString = 'valueString';

document.getElementById("signDeployerButton").onclick = async () => {
    try {
        const signedMessage = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_signDeployerMessage",
                    params: { byteCode, abi, network, keyString, valueString },
                },
            ],
        });
        document.getElementById('deployerOutput').value = signedMessage;
        alert("contract is signed by deployer. please proceed with feepayer");
    } catch (error) {
        console.error(error.message);
    }
};

document.getElementById("signFeePayerButton").onclick = async () => {
    try {
        let deployTx = document.getElementById('deployerOutput').value;
        const signedMessage = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_signFeePayerMessage",
                    params: { abi, deployTx, network },
                },
            ],
        });
        document.getElementById('deployedContract').value = signedMessage;
        alert("contract is signed and deployed by feepayer : "+signedMessage);
    } catch (error) {
        console.error(error.message);
    }
};

document.getElementById("getKeyString").onclick = async () => {
    try {
        let contractAddress = document.getElementById('deployedContract').value;
        const signedMessage = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_getKeyString",
                    params: { abi, contractAddress, network, keyString },
                },
            ],
        });
        document.getElementById('storeValue').value = signedMessage;
        alert("Key String Value is "+signedMessage);
    } catch (error) {
        console.error(error.message);
    }
};