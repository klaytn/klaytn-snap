import {
  MessageStatus,
  MetamaskKlaytnRpcRequest,
  MessageRequest,
  SignedMessage,
  SignMessageResponse,
  SnapConfig,
  MessageGasEstimate,
  SignRawMessageResponse,
  TransferRequest,
  TransferStatus,
} from "../types";
import { MetamaskKlaytnSnap } from "./snap";

async function sendSnapMethod<T>(
  request: MetamaskKlaytnRpcRequest,
  snapId: string
): Promise<T> {
  return await (window.ethereum.request({
    method: snapId,
    params: [request],
  }) as Promise<T>);
}

export async function getAddress(this: MetamaskKlaytnSnap): Promise<string> {
  return await sendSnapMethod({ method: "klay_getAddress" }, this.snapId);
}

export async function getPublicKey(
  this: MetamaskKlaytnSnap
): Promise<string> {
  return await sendSnapMethod({ method: "klay_getPublicKey" }, this.snapId);
}

export async function getBalance(this: MetamaskKlaytnSnap, params?: { address: string, network: string }): Promise<string> {
  return await sendSnapMethod({ method: "klay_getBalance", params: params }, this.snapId);
}

export async function exportPrivateKey(
  this: MetamaskKlaytnSnap
): Promise<string> {
  return await sendSnapMethod({ method: "klay_exportPrivateKey" }, this.snapId);
}

export async function configure(
  this: MetamaskKlaytnSnap,
  configuration: SnapConfig
): Promise<any> {
  return await sendSnapMethod(
    { method: "klay_config", params: { configuration: configuration } },
    this.snapId
  );
}

export async function signMessage(
  this: MetamaskKlaytnSnap,
  message: MessageRequest
): Promise<SignMessageResponse> {
  return await sendSnapMethod(
    { method: "klay_signMessage", params: { message: message, network: "baobab" } },
    this.snapId
  );
}

export async function signMessageRaw(
  this: MetamaskKlaytnSnap,
  rawMessage: string
): Promise<SignRawMessageResponse> {
  return await sendSnapMethod(
    { method: "klay_signMessageRaw", params: { message: rawMessage } },
    this.snapId
  );
}

export async function sendMessage(
  this: MetamaskKlaytnSnap,
  signedMessage: SignedMessage
): Promise<MessageStatus> {
  return await sendSnapMethod(
    { method: "klay_sendMessage", params: { signedMessage: signedMessage } },
    this.snapId
  );
}

export async function getMessages(
  this: MetamaskKlaytnSnap
): Promise<MessageStatus[]> {
  return await sendSnapMethod({ method: "klay_getMessages" }, this.snapId);
}

export async function calculateGasForMessage(
  this: MetamaskKlaytnSnap,
  message: MessageRequest,
  maxFee?: string
): Promise<MessageGasEstimate> {
  return await sendSnapMethod(
    {
      method: "klay_getGasForMessage",
      params: { maxFee: maxFee, message: message },
    },
    this.snapId
  );
}

export async function sendTransaction(
  this: MetamaskKlaytnSnap,
  params: TransferRequest
): Promise<TransferStatus> {
  return await sendSnapMethod(
    { method: "klay_sendTransaction", params },
    this.snapId
  );
}

export async function createFromRLPEncoding(
  this: MetamaskKlaytnSnap,
  params: { network: string, rlpEncodedKey: string }): Promise<any> {
  return await sendSnapMethod(
    {
      method: "klay_createFromRLPEncoding",
      params,
    },
    this.snapId
  );
}
export async function createWithAccountKeyFail(
  this: MetamaskKlaytnSnap,
  params: { network: string }): Promise<any> {
  return await sendSnapMethod(
    {
      method: "klay_createWithAccountKeyFail",
      params: params,
    },
    this.snapId
  );
}
export async function createWithAccountKeyLegacy(
  this: MetamaskKlaytnSnap,
  params: { network: string }): Promise<any> {
  return await sendSnapMethod(
    {
      method: "klay_createWithAccountKeyLegacy",
      params: params,
    },
    this.snapId
  );
}
export async function createWithAccountKeyPublic(
  this: MetamaskKlaytnSnap,
  params: { network: string, keyPublic: string }): Promise<any> {
  return await sendSnapMethod(
    {
      method: "klay_createWithAccountKeyPublic",
      params: params,
    },
    this.snapId
  );
}
export async function createWithAccountKeyWeightedMultiSig(
  this: MetamaskKlaytnSnap,
  params: { network: string, publicKeyArray: string[] }): Promise<any> {
  return await sendSnapMethod(
    {
      method: "klay_createWithAccountKeyWeightedMultiSig",
      params,
    },
    this.snapId
  );
}
export async function createWithAccountKeyRoleBased(
  this: MetamaskKlaytnSnap,
  params: { network: string, roledBasedPublicKeyArray: string[] }): Promise<any> {
  return await sendSnapMethod(
    {
      method: "klay_createWithAccountKeyRoleBased",
      params: params,
    },
    this.snapId
  );
}