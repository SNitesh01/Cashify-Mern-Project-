import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import colors from "../../constants/colors";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 5,
        marginBottom: 5
    },
    left: {
        display: 'flex',
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        fontWeight: 700,
        color: colors.dark,
    },
    back: {
        marginRight: 10
    },
    child: {
        display: 'flex',
        alignItems: 'center',
    }
})

class Subheader extends React.Component {
    render() {
        const { classes, title, back, children, history } = this.props

        return (
            <Box className={classes.root}>
                <Box className={classes.left}>
                    { back && (
                        <IconButton className={classes.back} onClick={() => history.goBack()}>
                            <ArrowBackIcon/>
                        </IconButton>
                    )}
                    <Typography className={classes.title}>{ title }</Typography>
                </Box>
                <Box className={classes.child}>
                    { children }
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(Subheader)