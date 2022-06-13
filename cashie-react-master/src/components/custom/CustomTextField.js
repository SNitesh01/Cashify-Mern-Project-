import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = {
    formControl: {
        textAlign: 'left'
    },
    input: {
        '& .MuiOutlinedInput-root': {
            height: 50,
            borderRadius: 50,
            background: '#ECF0EF',
            '& fieldset': {
                border: 'none',
                borderRadius: 50,
            },
        },
        '& .MuiOutlinedInput-marginDense': {
            height: 40,
            fontSize: 14
        },
        '& .MuiOutlinedInput-input': {
            height: 50,
            paddingTop: 0,
            paddingBottom: 0,
            paddingLeft: 20
        }
    }
}

class CustomTextField extends React.Component {
    render() {
        const { classes, label, input, helperText, color, InputProps, ...props } = this.props
        return (
            <FormControl className={classes.formControl} { ...props }>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <TextField
                    variant="outlined"
                    classes={{
                        root: classes.input
                    }}
                    helperText={helperText}
                    InputProps={InputProps}
                    { ...input }
                    { ...props }
                />
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomTextField)