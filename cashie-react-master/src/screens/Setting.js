import React from "react";
import {connect} from "react-redux";
import { Field, reduxForm } from 'redux-form';
import withStyles from "@material-ui/core/styles/withStyles";
import {fetchSetting, updateSetting} from "../actions";
import Subheader from "../components/basic/Subheader";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../components/custom/CustomTextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Loading from "../components/skeleton/Loading";
import InputAdornment from "@material-ui/core/InputAdornment";
import Alert from "@material-ui/lab/Alert";

const styles = {}

class Setting extends React.Component {

    componentDidMount() {
        this.props.fetchSetting()
    }

    submit = (data) => {
        const { id } = this.props
        data.id = id
        this.props.updateSetting(data)
    }

    render() {
        const { classes, history, loading, success, error, handleSubmit, loadingSubmit  } = this.props

        if (loading) return <Loading/>

        return (
            <Fade in={true}>
                <div>
                    <Subheader title="Update Store Setting" history={history}/>
                    <Card>
                        { success && <Alert severity="success">{ success }</Alert> }
                        { error && <Alert severity="error">{ error }</Alert> }
                        <form className={classes.root} onSubmit={handleSubmit(this.submit)}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Field
                                        fullWidth
                                        label="Store Name"
                                        name="name"
                                        component={CustomTextField}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Field
                                        fullWidth
                                        label="Discount"
                                        name="discount"
                                        component={CustomTextField}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Field
                                        fullWidth
                                        label="Tax"
                                        name="tax"
                                        component={CustomTextField}
                                        InputProps={{
                                            endAdornment: <InputAdornment position="start">%</InputAdornment>,
                                        }}
                                    />
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} justify="flex-end">
                                <Grid item xs={4}>
                                    <Button
                                        fullWidth
                                        color="secondary"
                                        type="submit"
                                        variant="contained"
                                        className={classes.button}
                                        disabled={loadingSubmit}
                                    >
                                        Submit
                                    </Button>
                                </Grid>
                            </Grid>
                        </form>
                    </Card>
                </div>
            </Fade>
        );
    }
}

const mapStateToProps = ({ setting }) => {
    const { single, update } = setting
    return {
        initialValues: {
            name: !single.loading && single.setting.name,
            discount: !single.loading && single.setting.discount,
            tax: !single.loading && single.setting.tax,
        },
        id: !single.loading && single.setting._id,
        loading: single.loading,
        loadingSubmit: update.loading,
        success: update.success,
        error: update.error
    }
}

const mapDispatchToProps = {
    fetchSetting,
    updateSetting
}

const Form = reduxForm({
    form: 'Setting',
    enableReinitialize: true,
})(Setting)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Form))
