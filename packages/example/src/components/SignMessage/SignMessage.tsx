import React, { useState } from "react";
import { Box, Button, CardContent, CardHeader, Grid, TextField, Typography } from '@material-ui/core/';
import { KlaytnSnapApi } from "../../types";
import toHex from "to-hex";
import ExpandResult from "../ExpandResult/ExpandResult";

export interface SignMessageProps {
    api: KlaytnSnapApi | null
}

export const SignMessage = (props: SignMessageProps) => {
    const [textFieldValue, setTextFieldValue] = useState<string>("");
    const [result, setResult] = useState<string>("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value);
    };

    const onSubmit = async () => {
        if (textFieldValue && props.api) {
            const rawMessage = textFieldValue || toHex(textFieldValue, { addPrefix: true });
            const sigResponse = await props.api.signMessage(rawMessage);
            if (sigResponse.messageHash && !sigResponse.error) {
                setResult(sigResponse.messageHash);
            }
            setTextFieldValue("");
        }
    };

    return (
        <>
            <CardHeader title="Sign custom message" />
            <CardContent>
                <Grid container>
                    <TextField
                        onChange={handleChange}
                        value={textFieldValue}
                        size="medium"
                        fullWidth
                        id="custom-message"
                        label="Message"
                        variant="outlined"
                    />
                </Grid>
                <Box m="0.5rem" />
                <Grid container justifyContent="flex-end">
                    <Button onClick={onSubmit} color="secondary" variant="contained" size="large">Sign</Button>
                </Grid>
                <Box m="1rem" />
                {result &&
                    <ExpandResult defaultExpand={true}>
                        <Typography>
                            Signature: {result}
                        </Typography>
                    </ExpandResult>
                }
            </CardContent>
        </>
    );
}