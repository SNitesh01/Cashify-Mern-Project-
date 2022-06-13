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
            '& .MuiSelect-outlined.MuiSelect-outlined': {
                height: '100%',
                paddingTop: 0,
                paddingBottom: 0,
                display: 'flex',
                alignItems: 'center',
                borderRadius: 50
            }
        },
        '& .MuiOutlinedInput-marginDense': {
            height: 40,
            fontSize: 14
        },
    }
}

class CustomSelectField extends React.Component {
    render() {
        const { classes, input, children, label, helperText,
            placeholder, onChange, ...props } = this.props

        return (
            <FormControl className={classes.formControl} { ...props }>
                { label && (
                    <Typography variant="caption">{ label }</Typography>
                )}
                <TextField
                    variant="outlined"
                    placeholder={placeholder}
                    classes={{
                        root: classes.input
                    }}
                    select
                    onChange={onChange}
                    { ...input }
                    { ...props }
                    helperText={helperText}
                    onKeyDown={onChange}
                >
                    { children }
                </TextField>
            </FormControl>
        );
    }
}

export default withStyles(styles)(CustomSelectField)