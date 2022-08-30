import Caver, { Account, AccountUpdate } from "caver-js";
import { estimateGas } from "../rpc/estimateGas";

export async function accountUpdate(address: string, account: Account, caver: Caver): Promise<AccountUpdate> {
    const txnObj: object = { from: address, account };    
    const gas: string = await estimateGas(txnObj, caver);
    const accountUpdated: AccountUpdate = caver.transaction.accountUpdate.create({ ...txnObj, gas });
    await accountUpdated.fillTransaction();

    return accountUpdated;
}
