export interface GetPublicKeyRequest {
  method: "klay_getPublicKey";
}

export interface GetAddressRequest {
  method: "klay_getAddress";
}

export interface ExportSeedRequest {
  method: "klay_exportPrivateKey";
}

export interface ConfigureRequest {
  method: "klay_config";
  params: {
    configuration: SnapConfig;
  };
}

export interface SignMessageRequest {
  method: "klay_signMessage";
  params: {
    message: MessageRequest;
    network?: string
  };
}

export interface SignMessageRawRequest {
  method: "klay_signMessageRaw";
  params: {
    message: string;
  };
}

export interface SendMessageRequest {
  method: "klay_sendMessage";
  params: {
    signedMessage: SignedMessage;
  };
}

export interface GetBalanceRequest {
  method: "klay_getBalance";
  params?: {
    address: string;
    network: string;
  }
}

export interface GetMessagesRequest {
  method: "klay_getMessages";
}

export interface GetGasForMessageRequest {
  method: "klay_getGasForMessage";
  params: {
    message: MessageRequest;
    maxFee?: string;
  };
}

export interface SendTransactionRequest {
  method: "klay_sendTransaction";
  params: MessageRequest
}

export interface CreateFromRLPEncodingRequest {
  method: "klay_createFromRLPEncoding";
  params: {
    network: string;
    rlpEncodedKey: string;
  }
}


export interface CreateWithAccountKeyLegacyRequest {
  method: "klay_createWithAccountKeyLegacy";
  params: {
    network: string;
  }
}

export interface CreateWithAccountKeyPublicRequest {
  method: "klay_createWithAccountKeyPublic";
  params: {
    network: string;
    keyPublic: string;
  }
}


export interface CreateWithAccountKeyFailRequest {
  method: "klay_createWithAccountKeyFail";
  params: {
    network: string;
  }
}

export interface CreateWithAccountKeyWeightedMultiSigRequest {
  method: "klay_createWithAccountKeyWeightedMultiSig";
  params: {
    network: string;
    publicKeyArray: string[];
  }
}
export interface CreateWithAccountKeyRoleBasedRequest {
  method: "klay_createWithAccountKeyRoleBased";
  params: {
    network: string;
    roledBasedPublicKeyArray: string[];
  }
}

export type MetamaskKlaytnRpcRequest =
  | GetPublicKeyRequest
  | GetAddressRequest
  | ExportSeedRequest
  | ConfigureRequest
  | GetBalanceRequest
  | GetMessagesRequest
  | SignMessageRequest
  | SignMessageRawRequest
  | SendMessageRequest
  | GetGasForMessageRequest
  | SendTransactionRequest
  | CreateFromRLPEncodingRequest
  | CreateWithAccountKeyFailRequest
  | CreateWithAccountKeyLegacyRequest
  | CreateWithAccountKeyPublicRequest
  | CreateWithAccountKeyWeightedMultiSigRequest
  | CreateWithAccountKeyRoleBasedRequest;

type Method = MetamaskKlaytnRpcRequest["method"];

export interface WalletEnableRequest {
  method: "wallet_enable";
  params: object[];
}

export interface GetSnapsRequest {
  method: "wallet_getSnaps";
}

export interface SnapRpcMethodRequest {
  method: string;
  params: [MetamaskKlaytnRpcRequest];
}

export type MetamaskRpcRequest =
  | WalletEnableRequest
  | GetSnapsRequest
  | SnapRpcMethodRequest;

export interface UnitConfiguration {
  symbol: string;
  decimals: number;
  image?: string;
  customViewUrl?: string;
}

export interface SnapConfig {
  derivationPath: string;
  network: KlaytnNetwork;
  rpc: {
    token: string;
    url: string;
  };
  unit?: UnitConfiguration;
}

export type Callback<T> = (arg: T) => void;

// Klaytn types

export interface Message {
  to: string;
  from: string;
  nonce: number;
  value: string;
  gasfeecap: string;
  gaspremium: string;
  gaslimit: number;
  method: number;
  params?: string;
}

export interface SignedMessage {
  message: Message;
  signature: MessageSignature;
}

export interface MessageSignature {
  data: string;
  type: number;
}

export interface SignMessageResponse {
  message?: string;
  messageHash?: string;
  error?: Error;
}

export interface SignRawMessageResponse {
  signature: string;
  confirmed: boolean;
  error: Error;
}

export interface MessageRequest {
  to: string;
  value: string;
  gaslimit?: number;
  gasfeecap?: string;
  gaspremium?: string;
  nonce?: number;
  method?: number;
  params?: string;
  from?: string;
  network?: string
}

export interface MessageGasEstimate {
  gaslimit: number;
  gasfeecap: string;
  gaspremium: string;
  maxfee: string;
}

export interface MessageStatus {
  message: Message;
  cid: string;
}

export interface TransferRequest {
  to: string;
  value: string;
  from: string;
  network: string
}


export interface TransferStatus {
  blockHash: string;
  blockNumber: string;
  contractAddress: string | null;
  effectiveGasPrice: string;
  from: string;
  gas: string;
  gasPrice: string;
  gasUsed: string;
  logs: string[];
  logsBloom: string;
  nonce: string;
  senderTxHash: string;
  signatures: { R: string; S: string; V: string }[];
  status: string;
  to: string;
  transactionHash: string;
  transactionIndex: string;
  type: string;
  typeInt: number;
  value: string;
}


export type KlaytnNetwork = "cypress" | "baobab";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface KlaytnEventApi { }

export interface KlaytnSnapApi {
  getPublicKey(): Promise<string>;
  getAddress(): Promise<string>;
  getBalance(params?: { address: string, network: string }): Promise<string>;
  exportPrivateKey(): Promise<string>;
  configure(configuration: Partial<SnapConfig>): Promise<void>;
  signMessage(message: MessageRequest): Promise<SignMessageResponse>;
  signMessageRaw(message: string): Promise<SignRawMessageResponse>;
  sendMessage(signedMessage: SignedMessage): Promise<MessageStatus>;
  getMessages(): Promise<MessageStatus[]>;
  calculateGasForMessage(
    message: MessageRequest,
    maxFee?: string
  ): Promise<MessageGasEstimate>;
  sendTransaction(params: TransferRequest): Promise<TransferStatus>;
  createFromRLPEncoding(params: { network: string, rlpEncodedKey: string }): Promise<any>;
  createWithAccountKeyFail(params: { network: string }): Promise<any>;
  createWithAccountKeyLegacy(params: { network: string }): Promise<any>;
  createWithAccountKeyPublic(params: { network: string, keyPublic: string }): Promise<any>;
  createWithAccountKeyWeightedMultiSig(params: { network: string, publicKeyArray: (string | string[])[] }): Promise<any>;
  createWithAccountKeyRoleBased(params: { network: string, roledBasedPublicKeyArray: (string | string[])[] }): Promise<any>;
}

export interface KeyPair {
  address: string;
  privateKey: string;
  publicKey: string;
}