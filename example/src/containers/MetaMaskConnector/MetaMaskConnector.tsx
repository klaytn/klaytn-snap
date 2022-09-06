import { Box, Button, Snackbar, IconButton } from "@material-ui/core";
import CloseIcon from '@material-ui/icons/Close';
import React, { useCallback, useContext, useEffect, useState } from "react";
import Alert from "@material-ui/lab/Alert";
import { MetamaskActions, MetaMaskContext } from "../../context/metamask";
import { initiateKlaytnSnap } from "../../services/metamask";
import { isMetamaskSnapsSupported } from "../../adapter";

export const MetaMaskConnector = () => {

    const [state, dispatch] = useContext(MetaMaskContext);
    const [needSnap, setNeedSnap] = useState<null | boolean>(null);

    useEffect(() => {
        (async () => {
            const isConnected = sessionStorage.getItem('metamask-snap');
            if (isConnected) {
                const installResult = await initiateKlaytnSnap();
                if (installResult.isSnapInstalled) {
                    dispatch({
                        type: MetamaskActions.SET_INSTALLED_STATUS,
                        payload: { isInstalled: true, snap: installResult.snap }
                    });
                }
            }
        })();
    }, [dispatch]);

    useEffect(() => {
        (async () => {
            if (state.hasMetaMask) setNeedSnap(await isMetamaskSnapsSupported());
        })();
    }, [state.hasMetaMask]);

    const installSnap = useCallback(async () => {
        const installResult = await initiateKlaytnSnap();
        if (!installResult.isSnapInstalled) {
            dispatch({
                type: MetamaskActions.SET_INSTALLED_STATUS,
                payload: { isInstalled: false, message: "Please accept snap installation prompt" }
            })
        } else {
            dispatch({
                type: MetamaskActions.SET_INSTALLED_STATUS,
                payload: { isInstalled: true, snap: installResult.snap }
            });
            sessionStorage.setItem('metamask-snap', "connected");
        }
    }, [dispatch]);

    const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch({ type: MetamaskActions.SET_INSTALLED_STATUS, payload: false })
    };

    const shouldDisplaySnackbar = (): boolean => {
        return !!(!state.KlaytnSnap.isInstalled && state.KlaytnSnap.message);
    };

    return (
        <div>
            <Snackbar
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
                open={shouldDisplaySnackbar()}
                autoHideDuration={6000}
                onClose={handleClose}
                message={state.KlaytnSnap.message}
                action={
                    <React.Fragment>
                        <IconButton size="small" aria-label="close" color="inherit" onClick={handleClose}>
                            <CloseIcon fontSize="small" />
                        </IconButton>
                    </React.Fragment>
                }
            />
            <Box sx={{ display: state.hasMetaMask ? "none" : "block", width: '100%' }}>
                <Alert severity="warning">Ensure that MetaMask is installed!</Alert>
                <Box mt={"1rem"} />
            </Box>
            <Box sx={{ display: !state.hasMetaMask || !!needSnap ? "none" : "block", width: '100%' }}>
                <Alert severity="warning">Metamask flask is required to run snap!</Alert>
                <Box mt={"1rem"} />
            </Box>
            <Button
                disabled={!state.hasMetaMask || !needSnap}
                onClick={installSnap}
                variant="contained"
                size={"large"}
                color="primary"
            >
                Connect to MetaMask
            </Button>
        </div>
    );
};