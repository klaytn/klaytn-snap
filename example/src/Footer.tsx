import { Box, Container, Grid, Typography } from "@material-ui/core";
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
    return (
        <Container style={{ position: "fixed", left: 0, bottom: 0, maxWidth: "100%", textAlign: "center" }}>
            <Grid style={{}} direction="row" alignItems="flex-end" justifyContent="center" container spacing={3}>
                <Box m="2rem" height="100%">
                    <a style={{ textDecoration: "unset" }} href={"https://github.com/klaytn/klaytn-snap"}>
                        <GitHubIcon fontSize={"large"} />
                        <Typography style={{ textDecoration: "unset" }}>Repo</Typography>
                    </a>
                </Box>
            </Grid>
        </Container>
    )
}

export default Footer;