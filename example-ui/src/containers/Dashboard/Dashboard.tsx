import React, { useCallback, useContext, useEffect, useState } from "react";
import {
    Box,
    //  Card, CardContent, CardHeader,
    Container, Grid, Hidden,
    // InputLabel, MenuItem, Select, 
    Typography,
} from '@material-ui/core/';
import { MetaMaskConnector } from "../MetaMaskConnector/MetaMaskConnector";
import { MetaMaskContext } from "../../context/metamask";
import { Account } from "../../components/Account/Account";
import {
    KlaytnSnapApi,
    // MessageStatus 
} from "../../types";
// import { TransactionTable } from "../../components/TransactionTable/TransactionTable";
import { SignMessage } from "../../components/SignMessage/SignMessage";
import { Transfer } from "../../components/Transfer/Transfer";
import Footer from "../../Footer";

export const Dashboard = () => {

    const [state] = useContext(MetaMaskContext);
    const [balance, setBalance] = useState("");
    const [address, setAddress] = useState("");
    // const [publicKey, setPublicKey] = useState("");
    // const [messages, setMessages] = useState<MessageStatus[]>([]);
    const [networks, setNetworks] = useState<"baobab" | "cypress">("baobab")

    const [balanceChange, setBalanceChange] = useState<boolean>(false);

    const [network, setNetwork] = useState<"cypress" | "baobab">("baobab");

    const [api, setApi] = useState<KlaytnSnapApi | null>(null);

    const handleNetworkChange = async (event: React.ChangeEvent<{ value: any }>) => {
        const selectedNetwork = event.target.value as "cypress" | "baobab";
        if (selectedNetwork === network) return;
        if (api) {
            try {
                await api.configure({ network: selectedNetwork });
                setNetworks(selectedNetwork)
                setNetwork(selectedNetwork);
                // setMessages(await api.getMessages());
            } catch (e) {
                console.error("Unable to change network", e)
            }
        }
    };

    const handleNewMessage = useCallback(async () => {
        if (api) {
            // setMessages(await api.getMessages());
        }
    }, [
        api,
        // setMessages
    ]);

    useEffect(() => {
        (async () => {
            if (state.KlaytnSnap.isInstalled && state.KlaytnSnap.snap) {
                const KlaytnApi = await state.KlaytnSnap.snap.getKlaytnSnapApi();
                setApi(KlaytnApi);
            }
        })();
    }, [state.KlaytnSnap.isInstalled, state.KlaytnSnap.snap]);

    useEffect(() => {
        (async () => {
            if (api) {
                const address = await api.getAddress();
                setAddress(address);
                // setPublicKey(await api.getPublicKey());
                setBalance(await api.getBalance({ address, network }));
                // setMessages(await api.getMessages());
            }
        })();
    }, [api, network]);

    useEffect(() => {
        // periodically check balance
        const interval = setInterval(async () => {
            if (api) {
                const newBalance = await api.getBalance({ address, network: 'baobab' });
                if (newBalance !== balance) {
                    setBalanceChange(true);
                    setBalance(newBalance);
                } else {
                    setBalanceChange(false)
                }
            }
        }, 30000); // every 30 seconds ~ 1 epoch
        return () => clearInterval(interval);
    }, [api, balance, setBalance, setBalanceChange, address]);

    console.log(state.KlaytnSnap.isInstalled)
    return (
        <Container maxWidth="lg">
            <Grid direction="column" alignItems="center" justifyContent="center" container spacing={3}>
                <Box m="2rem" style={{ textAlign: "center" }}>
                    <Typography variant="h2">
                        Klaytn-snap demo
                    </Typography>
                    <Typography style={{ color: "gray", fontStyle: "italic" }} variant="h6">
                        Klaytn-snap enables Klaytn network inside Metamask.
                    </Typography>
                </Box>
                <Box sx={{ display: state.KlaytnSnap.isInstalled ? "none" : "block"}}>
                    <MetaMaskConnector />
                    <Footer />
                </Box>
                <Box sx={{ display: !state.KlaytnSnap.isInstalled ? "none" : "block", width: '100%' }}>
                    {/* <Box m="1rem" alignSelf="baseline">
                        <InputLabel>Network</InputLabel>
                        <Select
                            onChange={handleNetworkChange}
                            value={networks}
                        >
                            <MenuItem value={"baobab"}>Testnet</MenuItem>
                            <MenuItem value={"cypress"}>Mainnet</MenuItem>
                        </Select>
                    </Box> */}
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item xs={12}>
                            <Account
                                address={address}
                                balance={balance + " KLAY"}
                                // publicKey={publicKey}
                                api={api}
                                balanceChange={balanceChange}
                            />
                        </Grid>
                    </Grid>
                    <Box m="1rem" />
                    <Grid container spacing={3} alignItems="stretch">
                        <Grid item md={6} xs={12}>
                            <Transfer api={api} network={network} onNewMessageCallback={handleNewMessage} />
                        </Grid>
                        <Grid item md={6} xs={12}>
                            <SignMessage api={api} />
                        </Grid>
                    </Grid>
                    {/*<Box m="1rem" />
                    <Grid container spacing={3} alignItems={"stretch"}>
                        <Grid item xs={12}>
                            <Card>
                                <CardHeader title="Account transactions" />
                                <CardContent>
                                  <TransactionTable txs={messages} />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid> */}
                </Box>
            </Grid>
        </Container>
    );
};