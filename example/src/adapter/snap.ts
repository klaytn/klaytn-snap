import { KlaytnSnapApi } from "../types";
import {
  calculateGasForMessage,
  configure,
  createFromRLPEncoding,
  createWithAccountKeyFail,
  createWithAccountKeyLegacy,
  createWithAccountKeyPublic,
  createWithAccountKeyRoleBased,
  createWithAccountKeyWeightedMultiSig,
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
      createFromRLPEncoding: createFromRLPEncoding.bind(this),
      createWithAccountKeyFail: createWithAccountKeyFail.bind(this),
      createWithAccountKeyLegacy: createWithAccountKeyLegacy.bind(this),
      createWithAccountKeyPublic: createWithAccountKeyPublic.bind(this),
      createWithAccountKeyWeightedMultiSig: createWithAccountKeyWeightedMultiSig.bind(this),
      createWithAccountKeyRoleBased: createWithAccountKeyRoleBased.bind(this),
    };
  };
}
