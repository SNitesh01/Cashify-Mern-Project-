import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Chip from "@material-ui/core/Chip";
import colors from "../../constants/colors";

const styles = {
    fanta: {
        color: colors.fanta,
        borderColor: colors.fanta
    },
    blue: {
        color: colors.blue,
        borderColor: colors.blue
    },
    green: {
        color: colors.green,
        borderColor: colors.green
    }
}

class CustomChip extends React.Component {
    render() {
        const { classes, role, color } = this.props

        return (
            <Chip
                size="small"
                variant="outlined"
                label={role}
                className={classes[color]}
            />
        );
    }
}

export default withStyles(styles)(CustomChip)