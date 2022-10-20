import { defaultConfig } from "./config/predefine";

export type KlaytnNetwork = "cypress" | "baobab";

export type MetamaskState = {
    klaytn: {
        derivationPath: string;
        network: KlaytnNetwork;
        rpc: {
            token: string;
            url: string;
        };
        unit: {
            decimal: number;
            image: string;
            symbol: string;
        };
    };
};

export type KeyPair = {
    address: string;
    privateKey: string;
    publicKey: string;
};

export const EmptyMetamaskState: () => MetamaskState = () => defaultConfig;
