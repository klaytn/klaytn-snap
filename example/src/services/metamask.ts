import { enableKlaytnSnap, MetamaskKlaytnSnap } from "../adapter";

export const defaultSnapId = 'local:http://localhost:8081';

let isInstalled: boolean = false;

export interface SnapInitializationResponse {
    isSnapInstalled: boolean;
    snap?: MetamaskKlaytnSnap;
}

export async function initiateKlaytnSnap(): Promise<SnapInitializationResponse> {
    const snapId = process.env.REACT_APP_SNAP_ID ? process.env.REACT_APP_SNAP_ID : defaultSnapId
    try {
        console.log('Attempting to connect to snap...');
        const metamaskKlaytnSnap = await enableKlaytnSnap({ network: "cypress" }, snapId, { version: "latest" });
        isInstalled = true;
        console.log('Snap installed!');
        return { isSnapInstalled: true, snap: metamaskKlaytnSnap };
    } catch (e) {
        console.error(e);
        isInstalled = false;
        return { isSnapInstalled: false };
    }
}

export async function isKlaytnSnapInstalled(): Promise<boolean> {
    return isInstalled;
}
