import React, { useCallback, useState } from "react";
import {
    Box,
    Button,
    CardContent,
    CardHeader,
    Grid,
    InputAdornment,
    TextField,
    Typography
} from '@material-ui/core/';
import { KlaytnSnapApi, TransferStatus } from "../../types";
import ExpandResult from "../ExpandResult/ExpandResult";
import { ChevronRight } from "@material-ui/icons";

interface ITransferProps {
    network: string,
    api: KlaytnSnapApi | null,
    onTransactionSuccess?: (tx: TransferStatus) => void,
    goToDetail?: (event: React.ChangeEvent<{}>) => void,
    address: string
}

export const Transfer: React.FC<ITransferProps> = ({ network, api, onTransactionSuccess, goToDetail, address }) => {
    const [recipient, setRecipient] = useState<string>("");
    const [amount, setAmount] = useState<string>("");
    // const [gasLimit, setGasLimit] = useState<string>("0");
    // const [gasPremium, setGasPremium] = useState<string>("0");
    // const [gasFeeCap, setGasFeeCap] = useState<string>("0");
    // const [maxFee, setMaxFee] = useState<string>("0"); 
    const [result, setResult] = useState<TransferStatus | any | null>(null);

    const handleRecipientChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setRecipient(event.target.value);
    }, [setRecipient]);

    const handleAmountChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        setAmount(event.target.value);
    }, [setAmount]);

    // const handleGasLimitChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //     setGasLimit(event.target.value);
    // }, [setGasLimit]);

    // const handleGasPremiumChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //     setGasPremium(event.target.value);
    // }, [setGasPremium]);

    // const handleMaxFeeChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //     setMaxFee(event.target.value);
    // }, [setMaxFee]);

    // const handleGasFeeCapChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    //     setGasFeeCap(event.target.value);
    // }, [setGasFeeCap]);


    // const onAutoFillGas = useCallback(async () => {
    //     if (recipient && amount && api) {

    //         const messageEstimate = (maxFee === "0") ? await api.calculateGasForMessage({
    //             to: recipient,
    //             value: BigInt(filToAttoFil(amount)).toString()
    //         }) : await api.calculateGasForMessage({
    //             to: recipient,
    //             value: BigInt(filToAttoFil(amount)).toString()
    //         }, maxFee);
    //         setGasPremium(attoFilToFil(messageEstimate.gaspremium));
    //         setGasFeeCap(attoFilToFil(messageEstimate.gasfeecap));
    //         setGasLimit(attoFilToFil(messageEstimate.gaslimit.toString()));
    //         setMaxFee(attoFilToFil(messageEstimate.maxfee));
    //     } else {
    //         showAlert("error", "Please first fill in Recipient and Amount fields");
    //     }
    // }, [recipient, amount, maxFee, api]);

    const onSubmit = useCallback(async () => {
        if (amount && recipient && api) {
            try {
                const txResult = await api.sendTransaction({ to: recipient, value: amount, from: address, network });
                console.log(txResult)
                setResult(txResult);
                // clear form
                setAmount("");
                setRecipient("");
                // setGasFeeCap("0");
                // setGasPremium("0");
                // setGasLimit("0");
                // setMaxFee("0");
                // inform to refresh messages display
                onTransactionSuccess?.(txResult);
            }
            catch (e) {
                setResult(e);
            }
        }
    }, [amount, recipient, api, address, network,
        //  gasLimit, gasFeeCap, gasPremium, 
        onTransactionSuccess]);
    return (
        <>
            <CardHeader title="Transfer" />
            <CardContent>
                <Grid container alignItems="center" justifyContent="space-between">
                    <Grid item xs={12}>
                        <TextField
                            onChange={handleRecipientChange} size="medium" fullWidth id="recipient" label="Recipient" variant="outlined" value={recipient}>
                        </TextField>
                        <Box m="1rem" />
                        <TextField
                            InputProps={{ startAdornment: <InputAdornment position="start">KLAY</InputAdornment> }}
                            onChange={handleAmountChange} size="medium" fullWidth id="amount" label="Amount" variant="outlined" value={amount}>
                        </TextField>
                        <Box m="0.5rem" />
                        {/*   <TextField
                            InputProps={{ startAdornment: <InputAdornment position="start">FIL</InputAdornment> }}
                            onChange={handleGasLimitChange} size="medium" fullWidth id="gaslimit" label="Gas Limit" variant="outlined" value={gasLimit}>
                        </TextField>
                        <Box m="0.5rem" />
                        <TextField
                            InputProps={{ startAdornment: <InputAdornment position="start">FIL</InputAdornment> }}
                            onChange={handleGasPremiumChange} size="medium" fullWidth id="gaspremium" label="Gas Premium" variant="outlined" value={gasPremium}>
                        </TextField>
                        <Box m="0.5rem" />
                        <TextField
                            InputProps={{ startAdornment: <InputAdornment position="start">FIL</InputAdornment> }}
                            onChange={handleGasFeeCapChange} size="medium" fullWidth id="gasfeecap" label="Gas Fee Cap" variant="outlined" value={gasFeeCap}>
                        </TextField>
                        <Box m="0.5rem" />
                        <TextField
                            InputProps={{ startAdornment: <InputAdornment position="start">FIL</InputAdornment> }}
                            onChange={handleMaxFeeChange} size="medium" fullWidth id="maxfee" label="Max fee (0.1 FIL if not set)" variant="outlined" value={maxFee}>
                        </TextField> */}
                    </Grid>
                </Grid>
                {/* <Box m="0.5rem" /> */}
                <Grid container item xs={12} justifyContent="flex-end" >
                    {/* <Button onClick={onAutoFillGas} color="secondary" variant="contained" size="large" style={{ marginRight: 10 }}>AUTO FILL GAS</Button> */}
                    <Button onClick={onSubmit} color="secondary" variant="contained" size="large">SEND</Button>
                </Grid>
                {result &&
                    <ExpandResult defaultExpand={true}>
                        {result.transactionHash ?
                            <Typography color="primary">
                                Tranfer successfuly! <br />
                                <Typography color="secondary">
                                    Transaction hash: {" "}
                                    <a
                                        href={`https://baobab.scope.klaytn.com/tx/${result.transactionHash}`}
                                        target="_blank"
                                        title="View on Baobab"
                                        rel="noreferrer"
                                    >{result.transactionHash}</a>
                                </Typography>
                                <a href="#history" onClick={goToDetail} style={{ cursor: 'pointer' }}>
                                    <Grid container item xs={12} justifyContent="flex-start" >
                                        <Typography color="secondary">History</Typography>
                                        <ChevronRight style={{ lineHeight: '1rem' }} color="secondary" />
                                    </Grid>
                                </a>
                            </Typography>
                            : <Typography color="error">
                                Tranfer failed! <br />
                                {result.message}
                            </Typography>}
                    </ExpandResult>
                }
            </CardContent>
        </>
    );
};
