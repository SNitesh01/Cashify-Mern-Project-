import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";

const styles = {
    root: {
        width: '100%',
        height: 100,
        display: 'flex',
        justifyContent: 'center'
    }
}

class EmptyData extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Box className={classes.root}>
                No Data
            </Box>
        );
    }
}

export default withStyles(styles)(EmptyData)