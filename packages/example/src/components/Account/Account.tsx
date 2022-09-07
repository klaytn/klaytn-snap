import React, { useState } from "react";
import { Box, Button, CardContent, Divider, Grid, TextField, Typography } from '@material-ui/core/';
import { KlaytnSnapApi } from "../../types";
import ExpandResult from "../ExpandResult/ExpandResult";

export interface AccountProps {
    network: string,
    api: KlaytnSnapApi | null
}
const initalState = {
    rlpEncodedKey: "",
    keyPublic: "",
    publicKeyArray: "",
    roledBasedPublicKeyArray: ""
}
const initalResult = {
    createFromRLPEncoding: "",
    createWithAccountKeyPublic: "",
    createWithAccountKeyLegacy: "",
    createWithAccountKeyFail: "",
    createWithAccountKeyWeightedMultiSig: "",
    createWithAccountKeyRoleBased: ""
}

export const Account = ({ api, network }: AccountProps) => {
    const [state, setState] = useState({ ...initalState });
    const [result, setResult] = useState({ ...initalResult });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setState(state => ({ ...state, [e.target.name]: e.target.value }));
    };
    const handleCreateFromRLPEncoding = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            try {
                const result = await api.createFromRLPEncoding({ network, rlpEncodedKey: state.rlpEncodedKey });
                setResult(state => ({ ...state, createFromRLPEncoding: JSON.stringify(result) }));
            } catch (e: any) {
                setResult(state => ({ ...state, createFromRLPEncoding: e.message }));
            }
        }
    };
    const handleCreateWithAccountKeyLegacy = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            try {
                const result = await api.createWithAccountKeyLegacy({ network });
                setResult(state => ({ ...state, createWithAccountKeyLegacy: JSON.stringify(result) }));
            } catch (e: any) {
                setResult(state => ({ ...state, createWithAccountKeyLegacy: e.message }));
            }
        }
    };
    const handleCreateWithAccountKeyPublic = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            try {
                const result = await api.createWithAccountKeyPublic({ network, keyPublic: state.keyPublic });
                setResult(state => ({ ...state, createWithAccountKeyPublic: JSON.stringify(result) }));
            } catch (e: any) {
                setResult(state => ({ ...state, createWithAccountKeyPublic: e.message }));
            }
        }
    };
    const handleCreateWithAccountKeyFail = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            try {
                const result = await api.createWithAccountKeyFail({ network });
                setResult(state => ({ ...state, createWithAccountKeyFail: JSON.stringify(result) }));
            } catch (e: any) {
                setResult(state => ({ ...state, createWithAccountKeyFail: e.message }));
            }
        }
    };
    const handleCreateWithAccountKeyWeightedMultiSig = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            try {
                const result = await api.createWithAccountKeyWeightedMultiSig({ network, publicKeyArray: state.publicKeyArray.split(',') });
                setResult(state => ({ ...state, createWithAccountKeyWeightedMultiSig: JSON.stringify(result) }));
            } catch (e: any) {
                setResult(state => ({ ...state, createWithAccountKeyWeightedMultiSig: e.message }));
            }
        }
    };
    const handleCreateWithAccountKeyRoleBased = async (e: React.MouseEvent<HTMLButtonElement>) => {
        if (api) {
            try {
                const roledBasedPublicKeyArray = state.roledBasedPublicKeyArray.split(";").map(i => i.split(','))
                const result = await api.createWithAccountKeyRoleBased({ network, roledBasedPublicKeyArray });
                setResult(state => ({ ...state, createWithAccountKeyRoleBased: JSON.stringify(result) }));
            } catch (e: any) {
                setResult(state => ({ ...state, createWithAccountKeyRoleBased: e.message }));
            }
        }
    };

    return (
        <>
            <CardContent>
                <Box m="2rem" />
                <Typography variant="subtitle1" component="h3">Create From RLP Encoding</Typography>
                <Box m=".5em" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.rlpEncodedKey}
                            name="rlpEncodedKey"
                            size="medium"
                            fullWidth
                            label="rlpEncodedKey"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateFromRLPEncoding} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {result.createFromRLPEncoding &&
                    <ExpandResult defaultExpand={true}>
                        {result.createFromRLPEncoding}
                    </ExpandResult>
                }
                <Box m="1rem" />
                <Divider light />
                <Box m="2rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" component="h3">Create From RLP Encoding</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyLegacy} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {result.createWithAccountKeyLegacy &&
                    <ExpandResult defaultExpand={true}>
                        {result.createWithAccountKeyLegacy}
                    </ExpandResult>
                }
                <Box m="1rem" />
                <Divider light />
                <Box m="2rem" />
                <Typography variant="subtitle1" component="h3">Create With Account Key Public</Typography>
                <Box m=".5em" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.keyPublic}
                            name="keyPublic"
                            size="medium"
                            fullWidth
                            label="keyPublic"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyPublic} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {result.createWithAccountKeyPublic &&
                    <ExpandResult defaultExpand={true}>
                        {result.createWithAccountKeyPublic}
                    </ExpandResult>
                }
                <Box m="1rem" />
                <Divider light />
                <Box m="2rem" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <Typography variant="subtitle1" component="h3">Create With Account Key Fail</Typography>
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyFail} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {result.createWithAccountKeyFail &&
                    <ExpandResult defaultExpand={true}>
                        {result.createWithAccountKeyFail}
                    </ExpandResult>
                }
                <Box m="1rem" />
                <Divider light />
                <Box m="2rem" />
                <Typography variant="subtitle1" component="h3">Create With Account Key Weighted MultiSig</Typography>
                <Box m=".5em" />
                <Grid container justifyContent="space-between" alignItems="center" spacing={2}>
                    <Grid item xs={10}>
                        <TextField
                            onChange={handleChange}
                            value={state.publicKeyArray}
                            name="publicKeyArray"
                            size="medium"
                            fullWidth
                            label="publicKeyArray"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={2}>
                        <Grid container justifyContent="center">
                            <Button onClick={handleCreateWithAccountKeyWeightedMultiSig} color="secondary" variant="contained" size="large">Execute</Button>
                        </Grid>
                    </Grid>
                </Grid>
                {result.createWithAccountKeyWeightedMultiSig &&
                    <ExpandResult defaultExpand={true}>
                        {result.createWithAccountKeyWeightedMultiSig}
                    </ExpandResult>
                }
                <Box m="1rem" />
                <Divider light />
                <Box m="2rem" />
                <Typography variant="subtitle1" component="h3">Create With Account Key Weighted MultiSig</Typography>
                <Box m=".5em" />
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
                {result.createWithAccountKeyRoleBased &&
                    <ExpandResult defaultExpand={true}>
                        {result.createWithAccountKeyRoleBased}
                    </ExpandResult>
                }
            </CardContent>
        </>
    )
};
