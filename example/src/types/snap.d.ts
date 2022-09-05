import { KlaytnSnapApi } from ".";
export declare class MetamaskKlaytnSnap {
    protected readonly snapOrigin: string;
    protected readonly snapId: string;
    constructor(snapOrigin: string);
    getKlaytnSnapApi: () => Promise<KlaytnSnapApi>;
}
