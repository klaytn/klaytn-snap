import Caver, { SignedMessage, SingleKeyring } from "caver-js";
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
