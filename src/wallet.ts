import Caver, {
    AbstractFeeDelegatedTransaction,
    AbstractTransaction,
    Keyring,
    SignedMessage,
    SingleKeyring,
    Transaction,
} from "caver-js";
import { getKeyPair } from "./account";
import { getCaver } from "./caver";
import { KeyPair, KlaytnNetwork } from "./interface";

export function generate(
    network: KlaytnNetwork,
    numberOfKeyrings: number,
    entropy?: string
): string[] {
    const caver: Caver = getCaver(network);
    return caver.wallet.generate(numberOfKeyrings, entropy);
}

export async function newKeyring(
    network: KlaytnNetwork,
    key: any
): Promise<Keyring> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);
    return caver.wallet.newKeyring(keyPair.address, key);
}

export function updateKeyring(
    network: KlaytnNetwork,
    keyring: Keyring
): Keyring {
    const caver: Caver = getCaver(network);
    return caver.wallet.updateKeyring(keyring);
}

export async function getKeyring(
    network: KlaytnNetwork,
    address: string
): Promise<Keyring> {
    const caver: Caver = getCaver(network);
    return caver.wallet.getKeyring(address);
}

export function isExisted(network: KlaytnNetwork, address: string): boolean {
    const caver: Caver = getCaver(network);
    return caver.wallet.isExisted(address);
}

export function add(network: KlaytnNetwork, keyring: Keyring): Keyring {
    const caver: Caver = getCaver(network);
    return caver.wallet.add(keyring);
}

export function remove(network: KlaytnNetwork, address: string): boolean {
    const caver: Caver = getCaver(network);
    return caver.wallet.remove(address);
}

export async function signMessage(
    network: KlaytnNetwork,
    message: string,
    role: number,
    index?: number
): Promise<SignedMessage> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    if (!isExisted(network, keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        add(network, keyring);
    }
    console.log("79 =====", caver.wallet.isExisted(keyPair.address));

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
    return caver.wallet.signMessage(keyPair.address, message, role, index);
}

export async function sign(
    network: KlaytnNetwork,
    transaction: Transaction,
    index?: number,
    hashser?: (transaction: AbstractTransaction) => string
): Promise<AbstractTransaction> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    if (!isExisted(network, keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        add(network, keyring);
    }

    const confirm = await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Confirm transaction",
                description: "Please confirm transaction",
                textAreaContent: `Address: ${
                    keyPair.address
                }\nTransaction: ${JSON.stringify(transaction)}`,
            },
        ],
    });

    if (!confirm) throw new Error("User rejected transaction");
    return caver.wallet.sign(keyPair.address, transaction, index, hashser);
}

export async function signAsFeePayer(
    network: KlaytnNetwork,
    transaction: AbstractFeeDelegatedTransaction,
    index?: number,
    hashser?: (transaction: AbstractFeeDelegatedTransaction) => string
): Promise<AbstractFeeDelegatedTransaction> {
    const keyPair: KeyPair = await getKeyPair();
    const caver: Caver = getCaver(network);

    if (!isExisted(network, keyPair.address)) {
        const keyring: SingleKeyring = caver.wallet.keyring.create(
            keyPair.address,
            keyPair.privateKey
        );
        add(network, keyring);
    }

    const confirm = await wallet.request({
        method: "snap_confirm",
        params: [
            {
                prompt: "Confirm transaction",
                description: "Please confirm transaction",
                textAreaContent: `Address: ${
                    keyPair.address
                }\nTransaction: ${JSON.stringify(transaction)}`,
            },
        ],
    });

    if (!confirm) throw new Error("User rejected transaction");
    return caver.wallet.signAsFeePayer(
        keyPair.address,
        transaction,
        index,
        hashser
    );
}

export async function generateWallet(
    network: KlaytnNetwork,
    numberOfKeyrings: number,
) {
    const caver: Caver = getCaver(network);
    return caver.wallet.generate(numberOfKeyrings);
}