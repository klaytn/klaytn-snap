import { SnapRpcMethodRequest } from ".";
declare global {
    interface Window {
        ethereum: {
            isMetaMask: boolean;
            isUnlocked: Promise<boolean>;
            request: <T>(request: SnapRpcMethodRequest | {
                method: string;
                params?: any[];
            }) => Promise<T>;
            on: (eventName: unknown, callback: unknown) => unknown;
        };
    }
}
