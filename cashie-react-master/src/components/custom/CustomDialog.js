import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from '@material-ui/icons/Close';

const styles = {
    paper: {
        width: '100%'
    },
    title: {
        padding: 20,
        display: 'flex',
        justifyContent: 'space-between'
    },
    content: {
        padding: 15
    }
}

class CustomDialog extends React.Component {
    render() {
        const { classes, title, open, onClose, children } = this.props
        return (
            <Dialog
                classes={{
                    paper: classes.paper
                }}
                open={open}
                onClose={onClose}>
                <Box className={classes.title}>
                    <Typography variant="h6">{ title }</Typography>
                    <IconButton onClick={onClose} size="small">
                        <CloseIcon/>
                    </IconButton>
                </Box>
                <Box className={classes.content}>
                    { children }
                </Box>
            </Dialog>
        );
    }
}

export default withStyles(styles)(CustomDialog)