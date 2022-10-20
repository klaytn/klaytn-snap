import Caver, {
    SingleKeyring,
    TransactionReceipt,
    ValueTransfer,
} from "caver-js";
import { getKeyPair } from "./account";
import { getCaver } from "./caver";
import { KeyPair, KlaytnNetwork } from "./interface";

export async function sendTransaction(
    network: KlaytnNetwork,
    to: string,
    value: string
): Promise<TransactionReceipt> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    if (!caver.wallet.isExisted(keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        caver.wallet.add(keyring);
    }

    const txn: object = {
        from: keyPair.address,
        to: to,
        value: caver.utils.toHex(caver.utils.toPeb(value)),
    };
    // const gas: string = await caver.rpc.klay.estimateGas(txn);
    const valueTransfer: ValueTransfer = caver.transaction.valueTransfer.create(
        { ...txn, gas: 30000 }
    );
    await valueTransfer.fillTransaction();

    const confirm = await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Confirm transaction",
                description: "Please confirm transaction",
                textAreaContent: `To: ${to}\nValue: ${value} KLAY`,
            },
        ],
    });

    if (!confirm) throw new Error("User rejected transaction");
    await caver.wallet.sign(keyPair.address, valueTransfer);
    return await caver.rpc.klay.sendRawTransaction(valueTransfer);
}