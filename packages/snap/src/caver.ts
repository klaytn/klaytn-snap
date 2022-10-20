import Caver from "caver-js";
import { KlaytnNetwork } from "./interface";

export const mainnet: Caver = new Caver(
    "https://public-node-api.klaytnapi.com/v1/cypress"
);

export const testnet: Caver = new Caver(
    "https://public-node-api.klaytnapi.com/v1/baobab"
);

export function getCaver(network: KlaytnNetwork): Caver {
    switch (network) {
        case "cypress":
            return mainnet;
        case "baobab":
            return testnet;
        default:
            return mainnet;
    }
}
