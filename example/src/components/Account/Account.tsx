import React, { useState } from "react";
import {
    Box, Button, CardContent, CardHeader, Dialog, DialogActions, DialogContent,
    DialogContentText, DialogTitle, Divider, Grid, TextField, Typography
} from '@material-ui/core/';
import { KlaytnSnapApi } from "../../types";

export interface AccountProps {
    network: string,
    api: KlaytnSnapApi | null
}
const initalState = {
    rlpEncodedKey: "",
    keyPublic: "",
    publicKeyArray: "",
    roledBasedPublicKeyArray: "",
}

export const Account = ({ api, network }: AccountProps) => {
    const [state, setState] = useState({ ...initalState });
    const [message, setMessage] = useState("");
    const [title, setTitle] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    };
    const handleCreateFromRLPEncoding = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            const result = await api.createFromRLPEncoding({ network, rlpEncodedKey: state.rlpEncodedKey });
            console.log(result);
            setTitle("Create From RLPEncoding Success")
            setMessage(JSON.stringify(result));
        }
    };
    const handleCreateWithAccountKeyLegacy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            const result = await api.createWithAccountKeyLegacy({ network });
            console.log(result);
            setTitle("Create With Account Key Legacy Success")
            setMessage(JSON.stringify(result));
        }
    };
    const handleCreateWithAccountKeyPublic = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            const result = await api.createWithAccountKeyPublic({ network, keyPublic: state.keyPublic });
            console.log(result);
            setTitle("Create With Account Key Public Success")
            setMessage(JSON.stringify(result));
        }
    };
    const handleCreateWithAccountKeyFail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            const result = await api.createWithAccountKeyFail({ network });
            console.log(result);
            setTitle("Create With Account Key Fail Success")
            setMessage(JSON.stringify(result));
        }
    };
    const handleCreateWithAccountKeyWeightedMultiSig = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            const publicKeyArray = state.publicKeyArray.split(";").map(i => i.split(','))
            const result = await api.createWithAccountKeyWeightedMultiSig({ network, publicKeyArray });
            console.log(result);
            setTitle("Create With Account Key Weighted MultiSig Success")
            setMessage(JSON.stringify(result));
        }
    };
    const handleCreateWithAccountKeyRoleBased = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            const roledBasedPublicKeyArray = state.roledBasedPublicKeyArray.split(";").map(i => i.split(','))
            const result = await api.createWithAccountKeyRoleBased({ network, roledBasedPublicKeyArray });
            console.log(result);
            setTitle("Create With Account Key Role Based Success")
            setMessage(JSON.stringify(result));
        }
    };

    return (
        <>
            <CardHeader title="Account Method" />
            <CardContent>
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.rlpEncodedKey}
                            name="rlpEncodedKey"
                            size="medium"
                            fullWidth
                            label="Create From RLP Encoding"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateFromRLPEncoding} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box m="1rem" />
                <Divider light />
                <Box m="1rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography>Create With Account Key Legacy</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyLegacy} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box m="1rem" />
                <Divider light />
                <Box m="1rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.keyPublic}
                            name="keyPublic"
                            size="medium"
                            fullWidth
                            label="Create With Account Key Public"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyPublic} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box m="1rem" />
                <Divider light />
                <Box m="1rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography>Create With Account Key Fail</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyFail} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box m="1rem" />
                <Divider light />
                <Box m="1rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.publicKeyArray}
                            name="publicKeyArray"
                            size="medium"
                            fullWidth
                            label="Create With Account Key Weighted MultiSig"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyWeightedMultiSig} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                <Box m="1rem" />
                <Divider light />
                <Box m="1rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.roledBasedPublicKeyArray}
                            name="roledBasedPublicKeyArray"
                            size="medium"
                            fullWidth
                            label="Create With Account Key Role Based"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyRoleBased} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
            <Dialog
                open={!!message}
                onClose={() => setMessage("")}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This is message of actions:<br />
                        <Typography style={{ wordWrap: "break-word" }}>{message}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setMessage("")} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    )
};
