import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field, reduxForm } from "redux-form";
import { connect } from "react-redux";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import Alert from '@material-ui/lab/Alert';
import Logo from "../assets/logo-white.png";
import { login } from "../actions"
import CustomTextField from "../components/custom/CustomTextField";
import Grid from "@material-ui/core/Grid";
import ImageLogin from "../assets/image-login.png";
import Typography from "@material-ui/core/Typography";
import colors from "../constants/colors";
import CircularProgress from "@material-ui/core/CircularProgress";

const styles = (theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    image: {
        width: '100%',
        height: '100vh',
        backgroundImage: `url(${ImageLogin})`,
        backgroundSize: 'cover',
        boxShadow: '0 5px 0 rgba(207,207,207,0.4), 0 5px 0 rgba(207,207,207,0.4)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        '& h4': {
            color: colors.white,
            marginBottom: 20
        },
        '& p': {
            color: colors.white,
            textAlign: 'center'
        }
    },
    login: {
        width: '100%',
        height: '100vh',
        display: 'flex',
        background: colors.white,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 120,
        marginBottom: 20
    },
    title: {
        fontSize: 32,
        fontWeight: 700,
        color: colors.fanta,
        marginTop: 20,
        marginBottom: 40
    },
    form: {
        [theme.breakpoints.down('sm')]: {
            width: '70%',
        },
        [theme.breakpoints.up('lg')]: {
            width: '50%',
        },
        '& .MuiTextField-root': {
            marginTop: theme.spacing(2),
            marginBottom: theme.spacing(2),
        },
        '& .MuiButton-contained': {
            marginTop: theme.spacing(2),
        }
    },
})

class Login extends React.Component {
    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.successMessage !== undefined) {
            setTimeout(() => {
                window.location.href = '/admin'
            }, 800)
        }
    }

    login = (data) => {
        this.props.login(data)
    }

    render() {
        const { classes, errorMessage, successMessage, loading, handleSubmit } = this.props

        return (
            <Box className={classes.root}>
                <Grid container>
                    <Grid item sm={6}>
                        <Box className={classes.image}>
                            <img className={classes.logo} src={Logo} alt="logo"/>
                            <Typography variant="h4">Welcome,</Typography>
                            <Typography variant="body1">Manage properly your business and enjoy the adventages</Typography>
                        </Box>
                    </Grid>
                    <Grid item sm={6}>
                        <Box className={classes.login}>
                            <Typography className={classes.title}>Sign In</Typography>
                            { errorMessage && <Alert severity="error">{ errorMessage }</Alert> }
                            { successMessage && <Alert severity="success">{ successMessage }</Alert> }
                            <form
                                className={classes.form}
                                onSubmit={handleSubmit(this.login)}>
                                <Field
                                    fullWidth
                                    placeholder="Username"
                                    name="username"
                                    component={CustomTextField}
                                />
                                <Field
                                    fullWidth
                                    placeholder="Password"
                                    name="password"
                                    type="password"
                                    component={CustomTextField}
                                />
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                    disabled={loading}
                                >
                                    { loading ? <CircularProgress color="inherit" size={24}/> : 'Login' }
                                </Button>
                            </form>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

const mapStateToProps = (state) => {
    const { auth } = state
    return {
        loading: auth.loading,
        successMessage: auth.success,
        errorMessage: auth.error
    }
}

const mapDispatchToProps = {
    login
}

const FormLogin = reduxForm({
    form: 'FormLogin',
    enableReinitialize: true
})(Login)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(FormLogin))