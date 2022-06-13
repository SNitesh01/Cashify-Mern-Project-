import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

const styles = {
    input: {
        '& .MuiOutlinedInput-root': {
            borderRadius: 30,
            background: '#ECF0EF',
            '& fieldset': {
                border: 'none',
            },
        },
        '& .MuiOutlinedInput-marginDense': {
            fontSize: 14
        },
        '& .MuiOutlinedInput-input': {
            paddingTop: 0,
            paddingBottom: 0,
        }
    }
}

class CustomTextArea extends React.Component {
    render() {
        const { classes, label, input, rows, helperText, color, InputProps, ...props } = this.props
        return (
            <FormControl { ...props }>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <TextField
                    variant="outlined"
                    multiline
                    rows={rows}
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

export default withStyles(styles)(CustomTextArea)