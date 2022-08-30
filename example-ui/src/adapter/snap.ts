import { KlaytnSnapApi } from "../types";
import {
  calculateGasForMessage,
  configure,
  exportPrivateKey,
  getAddress,
  getBalance,
  getMessages,
  getPublicKey,
  sendMessage,
  sendTransaction,
  signMessage,
  signMessageRaw,
} from "./methods";

export class MetamaskKlaytnSnap {
  // snap parameters
  protected readonly snapOrigin: string;
  protected readonly snapId: string;

  public constructor(snapOrigin: string) {
    this.snapOrigin = snapOrigin;
    this.snapId = `wallet_snap_${this.snapOrigin}`;
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  public getKlaytnSnapApi = async (): Promise<KlaytnSnapApi> => {
    return {
      calculateGasForMessage: calculateGasForMessage.bind(this),
      configure: configure.bind(this),
      exportPrivateKey: exportPrivateKey.bind(this),
      getAddress: getAddress.bind(this),
      getBalance: getBalance.bind(this),
      getMessages: getMessages.bind(this),
      getPublicKey: getPublicKey.bind(this),
      sendMessage: sendMessage.bind(this),
      signMessage: signMessage.bind(this),
      signMessageRaw: signMessageRaw.bind(this),
      sendTransaction: sendTransaction.bind(this),
    };
  };
}
