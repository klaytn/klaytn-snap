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
        const res = await ethereum.request({
            method: "wallet_enable",
            params: [{ wallet_snap: { [snapId]: {} } }],
        });
        console.log("22 =====", res);

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

        document.getElementById("addressSpan").innerHTML = address;
        document.getElementById("balanceSpan").innerHTML = balance;
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
        document.getElementById("rlpEncodedPre").innerHTML = JSON.stringify(
            account,
            null,
            2
        );
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
        document.getElementById("accountKeyLegacyPre").innerHTML =
            JSON.stringify(account, null, 2);
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
        document.getElementById("accountKeyPublicPre").innerHTML =
            JSON.stringify(account, null, 2);
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
        document.getElementById("accountKeyFailPre").innerHTML = JSON.stringify(
            account,
            null,
            2
        );
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
            document.getElementById("accountKeyWeightedMultiSigPre").innerHTML =
                JSON.stringify(account, null, 2);
        } catch (err) {
            console.error(err.message);
        }
    };

document.getElementById("accountKeyRoleBasedButton").onclick = async () => {
    const keyRoleBased = document.getElementById(
        "accountKeyRoleBasedInput"
    ).value;
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
        document.getElementById("accountKeyRoleBasedPre").innerHTML =
            JSON.stringify(account, null, 2);
    } catch (err) {
        console.error(err.message);
    }
};

/* ----- Wallet ----- */
document.getElementById("generateButton").onclick = async () => {
    const numberOfKeyrings = document.getElementById(
        "numberOfKeyringsInput"
    ).value;
    const entropy = document.getElementById("entropyInput").value;
    try {
        const generatedAddresses = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_generate",
                    params: { numberOfKeyrings, entropy, network },
                },
            ],
        });
        document.getElementById("generatePre").innerHTML = JSON.stringify(
            generatedAddresses,
            null,
            2
        );
    } catch (err) {
        console.error(err.message);
    }
};

document.getElementById("newKeyringButton").onclick = async () => {
    const key = document.getElementById("keyInput").value;
    let keyArray;
    if (key.includes(",")) {
        if (key.includes(";")) {
            keyArray = key.split(";").map((arr) => arr.split(","));     // role based keyring
        } else {
            keyArray = key.split(",");                                  // multiple keyring
        }
    } else {
        keyArray = key;                                                 // single keyring
    }

    try {
        const keyring = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                { method: "klay_newKeyring", params: { keyArray, network } },
            ],
        });
        document.getElementById("newKeyringPre").innerHTML = JSON.stringify(
            keyring,
            null,
            2
        );
    } catch (err) {
        console.error(err.message);
    }
};

document.getElementById("getKeyringButton").onclick = async () => {
    const address = document.getElementById("getKeyringAddressInput").value;
    try {
        const keyring = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                { method: "klay_getKeyring", params: { address, network } },
            ],
        })
        document.getElementById("getKeyringPre").innerHTML = JSON.stringify(
            keyring,
            null,
            2
        );
    } catch (err) {
        console.error(err.message);
    }
}

document.getElementById("isExistedButton").onclick = async () => {
    const address = document.getElementById("isExistedAddressInput").value;
    try {
        const keyring = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                { method: "klay_isExisted", params: { address, network } },
            ],
        })
        document.getElementById("isExistedPre").innerHTML = JSON.stringify(
            keyring,
            null,
            2
        );
    } catch (err) {
        console.error(err.message);
    }
}

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
        document.getElementById("transactionReceiptPre").innerHTML =
            JSON.stringify(receipt, null, 2);
        document.getElementById("balanceSpan").innerHTML = balance;
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
        document.getElementById("signedMessagePre").innerHTML = JSON.stringify(
            signedMessage,
            null,
            2
        );
    } catch (error) {
        console.error(error.message);
    }
};

document.getElementById("wallet-generate").onclick = async () => {
    const numberOfKeyrings = document.getElementById("numberOfKeyrings").value;
    const entropy = document.getElementById("entropy").value;
    try {
        const executeResult = await ethereum.request({
            method: "wallet_invokeSnap",
            params: [
                snapId,
                {
                    method: "klay_generate",
                    params: { network, numberOfKeyrings, entropy },
                },
            ],
        });
        document.getElementById("walletGenerateResult").innerText =
            JSON.stringify(executeResult);
    } catch (error) {
        console.error(error.message);
    }
};
