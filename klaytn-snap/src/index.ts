import { OnRpcRequestHandler } from "@metamask/snap-types";
import {
    createFromRLPEncoding,
    createWithAccountKeyFail,
    createWithAccountKeyLegacy,
    createWithAccountKeyPublic,
    createWithAccountKeyRoleBased,
    createWithAccountKeyWeightedMultiSig,
    getAddress,
} from "./account";
import { EmptyMetamaskState, KlaytnNetwork } from "./interface";
import { getBalance } from "./rpc";
import { sendTransaction } from "./transaction";
import { signMessage } from "./wallet";

export const onRpcRequest: OnRpcRequestHandler = async ({ request }) => {
    const state = await wallet.request({
        method: "snap_manageState",
        params: ["get"],
    });

    if (!state) {
        await wallet.request({
            method: "snap_manageState",
            params: ["update", EmptyMetamaskState()],
        });
    }

    switch (request.method) {
        case "klay_config": {
            return EmptyMetamaskState();
        }

        case "klay_getAddress": {
            return getAddress();
        }

        case "klay_getBalance": {
            const network: KlaytnNetwork = request.params["network"];
            return await getBalance(network);
        }

        // caver.account
        case "klay_createFromRLPEncoding": {
            const network: KlaytnNetwork = request.params["network"];
            const rlpEncodedKey: string = request.params["rlpEncodedKey"];
            return await createFromRLPEncoding(network, rlpEncodedKey);
        }

        case "klay_createWithAccountKeyFail": {
            const network: KlaytnNetwork = request.params["network"];
            return await createWithAccountKeyFail(network);
        }

        case "klay_createWithAccountKeyLegacy": {
            const network: KlaytnNetwork = request.params["network"];
            return await createWithAccountKeyLegacy(network);
        }

        case "klay_createWithAccountKeyPublic": {
            const network: KlaytnNetwork = request.params["network"];
            const keyPublic = request.params["keyPublic"];
            return await createWithAccountKeyPublic(network, keyPublic);
        }

        case "klay_createWithAccountKeyWeightedMultiSig": {
            const network: KlaytnNetwork = request.params["network"];
            const publicKeyArray: string[] = request.params["publicKeyArray"];
            return await createWithAccountKeyWeightedMultiSig(network, publicKeyArray);
        }

        case "klay_createWithAccountKeyRoleBased": {
            const network: KlaytnNetwork = request.params["network"];
            const roledBasedPublicKeyArray: string[][] = request.params["roledBasedPublicKeyArray"];
            return await createWithAccountKeyRoleBased(network, roledBasedPublicKeyArray);
        }

        // caver.transaction
        case "klay_sendTransaction": {
            const to: string = request.params["to"];
            const value: string = request.params["value"];
            const network: KlaytnNetwork = request.params["network"];
            return await sendTransaction(network, to, value);
        }

        case "klay_signMessage": {
            const network: KlaytnNetwork = request.params["network"];
            const message: string = request.params["message"];
            return await signMessage(network, message);
        }
        default:
            throw new Error("Method not supported");
    }
};
