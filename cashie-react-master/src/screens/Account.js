import React from "react";
import {connect} from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {fetchSingleUser, updateUser} from "../actions";
import {Field, reduxForm} from "redux-form";
import Subheader from "../components/basic/Subheader";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../components/custom/CustomTextField";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Loading from "../components/skeleton/Loading";
import Alert from "@material-ui/lab/Alert";

const styles = {
    root: {
        marginTop: 20
    },
    button: {
        marginTop: 20
    }
}

class Account extends React.Component {
    constructor(props) {
        super(props);

        const { user } = JSON.parse(localStorage.getItem('user'))

        this.state = {
            id: user._id
        }
    }

    componentDidMount() {
        const { id } = this.state
        this.props.fetchSingleUser(id)
    }

    submit = (data) => {
        data.id = this.state.id
        this.props.updateUser(data)
    }

    render() {
        const { classes, history, loading, loadingSubmit, handleSubmit, success, error } = this.props

        if (loading) return <Loading/>

        return (
            <Fade in={true}>
                <div>
                    <Subheader title="Update Account" history={history}/>
                    <Card>
                        { success && <Alert severity="success">{ success }</Alert> }
                        { error && <Alert severity="error">{ error }</Alert> }
                        <form className={classes.root} onSubmit={handleSubmit(this.submit)}>
                            <Grid container spacing={2}>
                                <Grid item sm={6}>
                                    <Field
                                        fullWidth
                                        label="Full Name"
                                        name="fullname"
                                        component={CustomTextField}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Field
                                        fullWidth
                                        label="Username"
                                        name="username"
                                        component={CustomTextField}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Field
                                        fullWidth
                                        label="Email Address"
                                        name="email"
                                        component={CustomTextField}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Field
                                        fullWidth
                                        label="Password"
                                        name="password"
                                        type="password"
                                        component={CustomTextField}
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

const mapStateToProps = ({ user }) => {
    const { single, update } = user
    return {
        initialValues: {
            fullname: !single.loading && single.user.fullname,
            username: !single.loading && single.user.username,
            email: !single.loading && single.user.email,
        },
        loading: single.loading,
        loadingSubmit: update.loading,
        success: update.success,
        error: update.error
    }
}

const mapDispatchToProps = {
    fetchSingleUser,
    updateUser
}

const Form = reduxForm({
    form: 'Account',
    enableReinitialize: true,
})(Account)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Form))