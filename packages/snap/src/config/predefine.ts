import { MetamaskState } from "../interface";

export const mainnetConfig: MetamaskState = {
    klaytn: {
        derivationPath: "m/44'/8217'/0'/0/0",
        network: "cypress",
        rpc: {
            token: "",
            url: "https://public-node-api.klaytnapi.com/v1/cypress",
        },
        unit: {
            decimal: 18,
            image: "https://cryptologos.cc/logos/klaytn-klay-logo.svg?v=023",
            symbol: "KLAY",
        },
    },
};

export const testnetConfig: MetamaskState = {
    klaytn: {
        derivationPath: "m/44'/8217'/0'/0/0",
        network: "baobab",
        rpc: {
            token: "",
            url: "https://public-node-api.klaytnapi.com/v1/baobab",
        },
        unit: {
            decimal: 18,
            image: "https://cryptologos.cc/logos/klaytn-klay-logo.svg?v=023",
            symbol: "KLAY",
        },
    },
};;

export const defaultConfig: MetamaskState = mainnetConfig;
