import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import colors from "../../constants/colors";
import Typography from "@material-ui/core/Typography";

const styles = {
    root: {
        width: 300,
        height: 200,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        borderRadius: 20,
    },
    successIcon: {
        color: colors.green,
        fontSize: 100
    },
    errorIcon: {
        color: colors.red,
        fontSize: 100
    },
    message: {
        marginTop: 10,
        fontWeight: 700,
        color: colors.grey
    }
}

class StatusDialog extends React.Component {
    render() {
        const { classes, open, success, error, message, onClose } = this.props
        return (
            <Dialog
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.paper
                }}>
                <DialogContent className={classes.root}>
                    { success && <CheckCircleIcon className={classes.successIcon}/> }
                    { error && <ErrorIcon className={classes.errorIcon}/> }
                    <Typography className={classes.message}>
                        { message }
                    </Typography>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(StatusDialog)