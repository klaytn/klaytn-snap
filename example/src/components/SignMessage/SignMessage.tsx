import React, { useState } from "react";
import { Box, Button, Card, CardContent, CardHeader, Dialog, Grid, TextField } from '@material-ui/core/';
import { DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from "@material-ui/core";
import { KlaytnSnapApi } from "../../types";
import toHex from "to-hex";

export interface SignMessageProps {
    api: KlaytnSnapApi | null
}

export const SignMessage = (props: SignMessageProps) => {
    const [textFieldValue, setTextFieldValue] = useState<string>("");
    const [modalBody, setModalBody] = useState<string>("");
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTextFieldValue(event.target.value);
    };

    const onSubmit = async () => {
        if (textFieldValue && props.api) {
            const rawMessage = textFieldValue || toHex(textFieldValue, { addPrefix: true });
            const sigResponse = await props.api.signMessage(rawMessage);
            if (sigResponse.messageHash && !sigResponse.error) {
                setModalBody(sigResponse.messageHash);
                setModalOpen(true);
            }
            setTextFieldValue("");
        }
    };

    return (
        <Card style={{ height: "100%" }}>
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
            </CardContent>
            <Dialog
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Message signature"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        This is signature of your message:<br />
                        <Typography style={{ wordWrap: "break-word" }}>{modalBody}</Typography>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setModalOpen(false)} color="primary" autoFocus>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Card>
    );
}