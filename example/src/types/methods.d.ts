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
export declare function createFromRLPEncoding(this: MetamaskKlaytnSnap, params: { network: string, rlpEncodedKey: string }): Promise<any>;
export declare function createWithAccountKeyFail(this: MetamaskKlaytnSnap, params: { network: string }): Promise<any>;
export declare function createWithAccountKeyLegacy(this: MetamaskKlaytnSnap, params: { network: string }): Promise<any>;
export declare function createWithAccountKeyPublic(this: MetamaskKlaytnSnap, params: { network: string, keyPublic: string }): Promise<any>;
export declare function createWithAccountKeyWeightedMultiSig(this: MetamaskKlaytnSnap, params: { network: string, publicKeyArray: (string | string[])[] }): Promise<any>;
export declare function createWithAccountKeyRoleBased(this: MetamaskKlaytnSnap, params: { network: string, roledBasedPublicKeyArray: (string | string[])[] }): Promise<any>;
