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
