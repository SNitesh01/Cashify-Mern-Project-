import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";

const styles = {
    root: {
        width: '100%',
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    text: {
        marginBottom: 10
    }
}

class ErrorFetch extends React.Component {
    render() {
        const { onClick, classes } = this.props
        return (
            <Box className={classes.root}>
                <Typography className={classes.text}>Oops... Something Wrong!</Typography>
                <Button
                    size="small"
                    variant="contained"
                    color="primary"
                    onClick={onClick} >
                    Try Again
                </Button>
            </Box>
        );
    }
}

export default withStyles(styles)(ErrorFetch)