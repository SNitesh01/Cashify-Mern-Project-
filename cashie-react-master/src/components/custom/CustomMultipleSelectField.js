import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import Chip from "@material-ui/core/Chip";
import colors from "../../constants/colors";

const styles = {
    root: {
        minWidth: '100%',
        maxWidth: 600,
    },
    input: {
        '& fieldset': {
            border: 'none',
            borderRadius: 50,
        },
        '& .MuiSelect-outlined.MuiSelect-outlined': {
            minHeight: 50,
            paddingTop: 0,
            paddingBottom: 0,
            borderRadius: 30,
            background: '#ECF0EF',
            display: 'flex',
            alignItems: 'center',
        },
    },

}

class CustomMultipleSelectField extends React.Component {
    render() {
        const { classes, input, value, children, label, helperText, renderValue,
            placeholder, onChange, ...props } = this.props

        return (
            <FormControl { ...props } variant="outlined" className={classes.root}>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <Select
                    multiple
                    className={classes.input}
                    input={input}
                    renderValue={renderValue}
                >
                    { children }
                </Select>
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomMultipleSelectField)