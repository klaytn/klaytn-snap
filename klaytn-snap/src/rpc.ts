import Caver from "caver-js";
import { getKeyPair } from "./account";
import { getCaver } from "./caver";
import { KlaytnNetwork } from "./interface";

export async function estimateGas(caver: Caver, txn: object): Promise<string> {
    return await caver.rpc.klay.estimateGas(txn);
}

export async function getBalance(network: KlaytnNetwork): Promise<string> {
    const address: string = (await getKeyPair()).address;
    const caver: Caver = getCaver(network);
    const balance: string = await caver.rpc.klay.getBalance(address);
    return caver.utils.fromPeb(balance, "KLAY");
}