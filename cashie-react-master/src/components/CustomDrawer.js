import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Drawer from "@material-ui/core/Drawer";
import colors from "../constants/colors";

const styles = {
    drawer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        padding: 30
    },
    title: {
        fontSize: 18,
        fontWeight: 700,
        paddingBottom: 15,
        color: colors.dark
    }
}

class CustomDrawer extends React.Component {
    render() {
        const { open, onClose, title, children, classes } = this.props
        return (
            <Drawer
                classes={{
                    paper: classes.drawer
                }}
                anchor="bottom"
                open={open}
                onClose={onClose}>
                <Box>
                    <Typography className={classes.title}>{ title }</Typography>
                    { children }
                </Box>
            </Drawer>
        );
    }
}

export default withStyles(styles)(CustomDrawer)