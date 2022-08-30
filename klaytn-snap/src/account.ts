import {
    getBIP44AddressKeyDeriver,
    JsonBIP44CoinTypeNode,
} from "@metamask/key-tree";
import Caver, { Account } from "caver-js";
import { getCaver } from "./caver";
import { KeyPair, KlaytnNetwork, MetamaskState } from "./interface";

export async function getKeyPair(): Promise<KeyPair> {
    const state = (await wallet.request({
        method: "snap_manageState",
        params: ["get"],
    })) as MetamaskState;
    const derivationPath = state.klaytn.derivationPath;
    const [, , coinType, account, change, addressIndex] =
        derivationPath.split("/");
    const bip44Code = coinType.replace("'", "");
    const bip44Node = (await wallet.request({
        method: `snap_getBip44Entropy_${bip44Code}`,
    })) as JsonBIP44CoinTypeNode;

    const addressKeyDeriver = await getBIP44AddressKeyDeriver(bip44Node, {
        account: parseInt(account),
        change: parseInt(change),
    });
    const addressKey = await addressKeyDeriver(parseInt(addressIndex));

    return {
        address: addressKey.address,
        privateKey: addressKey.privateKey,
        publicKey: addressKey.publicKey,
    };
}

export async function getAddress() {
    const keyPair: KeyPair = await getKeyPair();
    return keyPair.address;
}

export async function createFromRLPEncoding(
    network: KlaytnNetwork,
    rlpEncodedKey: string
): Promise<Account> {
    const caver: Caver = getCaver(network);
    const address: string = await getAddress();
    return caver.account.createFromRLPEncoding(address, rlpEncodedKey);
}

export async function createWithAccountKeyFail(
    network: KlaytnNetwork
): Promise<Account> {
    const caver: Caver = getCaver(network);
    const address: string = await getAddress();
    return caver.account.createWithAccountKeyFail(address);
}

export async function createWithAccountKeyLegacy(
    network: KlaytnNetwork
): Promise<Account> {
    const caver: Caver = getCaver(network);
    const address: string = await getAddress();
    return caver.account.createWithAccountKeyLegacy(address);
}

export async function createWithAccountKeyPublic(
    network: KlaytnNetwork,
    publicKey: string
): Promise<Account> {
    const caver: Caver = getCaver(network);
    const address: string = await getAddress();
    return caver.account.createWithAccountKeyPublic(address, publicKey);
}

export async function createWithAccountKeyRoleBased(
    network: KlaytnNetwork,
    roledBasedPublicKeyArray: string[][]
): Promise<Account> {
    const caver: Caver = getCaver(network);
    const address: string = await getAddress();
    return caver.account.createWithAccountKeyRoleBased(
        address,
        roledBasedPublicKeyArray
    );
}

export async function createWithAccountKeyWeightedMultiSig(
    network: KlaytnNetwork,
    publicKeyArray: string[]
): Promise<Account> {
    const caver: Caver = getCaver(network);
    const address: string = await getAddress();
    return caver.account.createWithAccountKeyWeightedMultiSig(
        address,
        publicKeyArray
    );
}
