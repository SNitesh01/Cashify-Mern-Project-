import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = {
    root: {
        width: '100%',
        textAlign: 'center',
        paddingTop: 40,
        paddingBottom: 40
    }
}

class Loading extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Box className={classes.root}>
                <CircularProgress color="secondary" />
            </Box>
        );
    }
}

export default withStyles(styles)(Loading)