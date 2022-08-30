import {
  MessageStatus,
  MetamaskKlaytnRpcRequest,
  MessageRequest,
  SignedMessage,
  SignMessageResponse,
  SnapConfig,
  MessageGasEstimate,
  SignRawMessageResponse,
} from "../types";
import { MetamaskKlaytnSnap } from "./snap";

async function sendSnapMethod<T>(
  request: MetamaskKlaytnRpcRequest,
  snapId: string
): Promise<T> {
  try {
    console.log({ snapId })
    const res = await (window.ethereum.request({
      method: snapId,
      params: [request],
    }) as Promise<T>);
    console.log({
      method: snapId,
      params: [request],
      success: true,
      res
    });
    return res
  }
  catch (e) {
    console.log({
      method: snapId,
      params: [request],
      success: false
    })
    const res = await (window.ethereum.request({
      method: snapId,
      params: [request],
    }) as Promise<T>);
    return res
  }
}

export async function getAddress(this: MetamaskKlaytnSnap): Promise<string> {
  console.log(this.snapId)
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
  const fake = async () => ({
    "derivationPath": "m/44'/461'/0'/0/0",
    "network": "f",
    "rpc": {
      "token": "",
      "url": "https://api.node.glif.io"
    },
    "unit": {
      "decimals": 6,
      "image": "https://cryptologos.cc/logos/Klaytn-fil-logo.svg?v=007",
      "symbol": "FIL"
    }
  })
  return fake();
  return await sendSnapMethod(
    { method: "fil_configure", params: { configuration: configuration } },
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
  message: MessageRequest
): Promise<MessageStatus> {
  return await sendSnapMethod(
    { method: "klay_sendTransaction", params: message },
    this.snapId
  );
}
