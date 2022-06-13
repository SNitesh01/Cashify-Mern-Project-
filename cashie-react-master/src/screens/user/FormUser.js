import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Fade from "@material-ui/core/Fade";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import Subheader from "../../components/basic/Subheader";
import Card from "@material-ui/core/Card";
import GradientButton from "../../components/basic/GradientButton";
import Grid from "@material-ui/core/Grid";
import MenuItem from "@material-ui/core/MenuItem";
import ROLE from "../../constants/role";
import { createUser, updateUser, fetchSingleUser } from "../../actions";
import Loading from "../../components/skeleton/Loading";
import CustomTextField from "../../components/custom/CustomTextField";
import CustomSelectField from "../../components/custom/CustomSelectField";

const styles = {
    root: {
        padding: 30
    },
    hide: {
        display: 'none'
    }
}

class FormUser extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id !== undefined ? this.props.match.params.id : '',
            role: ROLE.Cashier,
            user: ''
        }
    }

    componentDidMount() {
        const { id } = this.state
        this.props.fetchSingleUser(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { success, history, reset } = this.props
            if (success !== undefined) {
                setTimeout(() => {
                    reset('FormUser')
                    history.push({ pathname: '/admin/user' })
                }, 1000)
            }
        }
    }

    roleChange = (e) => {
        this.setState({
            role: e.target.value
        })
    }

    submit = (data) => {
        if (this.state.id === '') {
            this.props.createUser(data)
        } else {
            data.id = this.state.id
            this.props.updateUser(data)
        }

    }

    render() {
        const { id, role } = this.state
        const { history, errors, handleSubmit, submitLoading, fetchLoading} = this.props

        if (id !== '' && fetchLoading) {
            return <Loading/>
        }
        return (
            <Fade in={true}>
                <div>
                    <Subheader back title="Form User" history={history}/>
                    <Card>
                        <form onSubmit={handleSubmit(this.submit)}>
                            <Grid container spacing={3} justify="flex-start">
                                <Grid item xs={6}>
                                    <Field
                                        error={errors && errors['fullname'] !== ''}
                                        fullWidth
                                        label="Full Name"
                                        variant="outlined"
                                        name="fullname"
                                        component={CustomTextField}
                                        helperText={errors && errors['fullname']}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        error={errors && errors['username'] !== ''}
                                        fullWidth
                                        label="Username"
                                        variant="outlined"
                                        name="username"
                                        component={CustomTextField}
                                        helperText={errors && errors['username']}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        error={errors && errors['email'] !== ''}
                                        fullWidth
                                        label="Email Address"
                                        variant="outlined"
                                        name="email"
                                        component={CustomTextField}
                                        helperText={errors && errors['email']}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        error={errors && errors['password'] !== ''}
                                        fullWidth
                                        label="Password"
                                        variant="outlined"
                                        name="password"
                                        type="password"
                                        component={CustomTextField}
                                        helperText={errors && errors['password']}
                                    />
                                </Grid>
                                <Grid item sm={6}>
                                    <Field
                                        error={errors && errors['role'] !== ''}
                                        fullWidth
                                        label="Role"
                                        variant="outlined"
                                        name="role"
                                        value={role}
                                        onChange={this.roleChange}
                                        component={CustomSelectField}
                                        helperText={errors && errors['role']}
                                    >
                                        {Object.keys(ROLE).map(key => (
                                            <MenuItem
                                                value={ROLE[key]}
                                                key={key}>
                                                {ROLE[key]}
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                            </Grid>
                            <Grid container spacing={3} justify="flex-end">
                                <Grid item xs={4}>
                                    <GradientButton
                                        fullWidth
                                        type="submit"
                                        disabled={submitLoading}>
                                        Submit
                                    </GradientButton>
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
    const { create, single, update } = user
    return {
        initialValues: {
            fullname: single.user ? single.user.fullname : '',
            username: single.user ? single.user.username : '',
            email: single.user ? single.user.email : '',
            password: '',
            role: single.user ? single.user.role : '',
        },
        fetchLoading: single.loading,
        submitLoading: create.loading || update.loading,
        user: single.user,
        errors: create.error,
        success: create.success || update.success
    }
}

const mapDispatchToProps = {
    createUser,
    updateUser,
    fetchSingleUser
}

const Form = reduxForm({
    form: 'FormUser',
    enableReinitialize: true,
})(FormUser)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Form))