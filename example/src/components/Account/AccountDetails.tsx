import { Box, Card, CardContent, CardHeader, Divider, Grid, Typography } from '@material-ui/core/';
import { KlaytnSnapApi } from "../../types";

export interface AccountDetailsProps {
    address: string,
    // publicKey: string,
    balance: string,
    balanceChange: boolean,
    api: KlaytnSnapApi | null
}

export const AccountDetails = (props: AccountDetailsProps) => {

    // const handleExport = async () => {
    //     if (props.api) {
    //         const privateKey = await props.api.exportPrivateKey();
    //         alert(`Your private key: ${privateKey}`);
    //     }
    // };

    return (
        <Card>
            <CardHeader title="Instructions" />
            <CardContent>
                <Grid container alignItems="center">
                    <Grid item md={6} xs={12}>
                        <Typography variant="h6">ADDRESS:</Typography>
                        <Typography variant="subtitle2">{props.address}</Typography>
                        <Divider light />
                        <Box m={"0.5rem"} />
                        {/* <Typography variant="h6">PUBLIC KEY:</Typography>
                    <Typography variant="subtitle2">{props.publicKey}</Typography>
                    <Divider light/>
                    <Box m={"0.5rem"}/> */}
                        <Typography variant="h6">ACCOUNT BALANCE:</Typography>
                        {props.balanceChange
                            ? <Typography variant="subtitle2" ><b>{props.balance}</b></Typography>
                            : <Typography variant="subtitle2" >{props.balance}</Typography>
                        }
                    </Grid>
                </Grid>
                {/* <Grid container item xs={12} justifyContent="flex-end">
                <Button color="secondary" variant={"contained"} onClick={handleExport}>Export private key</Button>
            </Grid> */}
            </CardContent>
        </Card>
    );
};
