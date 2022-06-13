import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Button from "@material-ui/core/Button";
import colors from "../../constants/colors";

const styles = {
    root: {
        background: 'linear-gradient(45deg, rgba(234,81,121,1) 0%, rgba(172,54,115,1) 100%)',
        color: colors.white
    },
    disabled: {
        background: colors.grey
    }
}

class GradientButton extends React.Component {
    render() {
        const { classes, disabled, children, ...props } = this.props
        return (
            <Button className={classNames(
                classes.root,
                disabled && classes.disabled
            )} variant="contained" disabled={disabled} {...props}>
                { children }
            </Button>
        );
    }
}

export default withStyles(styles)(GradientButton)