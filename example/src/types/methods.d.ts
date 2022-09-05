import { MetamaskKlaytnSnap } from './snap'
export declare function getAddress(this: MetamaskKlaytnSnap): Promise<string>;
export declare function getPublicKey(this: MetamaskKlaytnSnap): Promise<string>;
export declare function getBalance(this: MetamaskKlaytnSnap, params?: {
    address: string;
    network: string;
}): Promise<string>;
export declare function exportPrivateKey(this: MetamaskKlaytnSnap): Promise<string>;
export declare function configure(this: MetamaskKlaytnSnap, configuration: SnapConfig): Promise<any>;
export declare function signMessage(this: MetamaskKlaytnSnap, message: MessageRequest): Promise<SignMessageResponse>;
export declare function signMessageRaw(this: MetamaskKlaytnSnap, rawMessage: string): Promise<SignRawMessageResponse>;
export declare function sendMessage(this: MetamaskKlaytnSnap, signedMessage: SignedMessage): Promise<MessageStatus>;
export declare function getMessages(this: MetamaskKlaytnSnap): Promise<MessageStatus[]>;
export declare function calculateGasForMessage(this: MetamaskKlaytnSnap, message: MessageRequest, maxFee?: string): Promise<MessageGasEstimate>;
export declare function sendTransaction(this: MetamaskKlaytnSnap, message: MessageRequest): Promise<MessageStatus>;
