import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Button from "@material-ui/core/Button";

const styles = {
    input: {
        display: 'none'
    }
}

const CustomFilePicker = ({ classes, input, type, onClick, meta: { touched, error, warning } }) => {
    delete input.value

    return (
        <div>
            <input {...input} onClick={onClick} type={type} className={classes.input} id={input.name}/>
            <label htmlFor={input.name}>
                <Button variant="contained"
                        color="primary"
                        component="span"
                        size="small"
                        startIcon={<AddCircleOutlineIcon/>}>
                    Browse
                </Button>
            </label>
        </div>
    )
}

export default withStyles(styles)(CustomFilePicker)