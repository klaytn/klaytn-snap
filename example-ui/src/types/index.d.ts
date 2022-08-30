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
  method: "fil_configure";
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

export interface sendTransactionRequest {
  method: "klay_sendTransaction";
  params: MessageRequest
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
  | sendTransactionRequest;

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
  signedMessage: SignedMessage;
  confirmed: boolean;
  error: Error;
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
  sendTransaction(params: MessageRequest): Promise<MessageStatus>;
}

export interface KeyPair {
  address: string;
  privateKey: string;
  publicKey: string;
}