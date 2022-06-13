import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { connect } from "react-redux";
import { Field, reduxForm } from 'redux-form';
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/custom/CustomTextField";
import { fetchCategories, fetchSingleCategory, createCategory, updateCategory } from "../../actions";
import Button from "@material-ui/core/Button";
import Fade from "@material-ui/core/Fade";
import Subheader from "../../components/basic/Subheader";
import Card from "@material-ui/core/Card";
import Loading from "../../components/skeleton/Loading";
import Typography from "@material-ui/core/Typography";

const styles = {
    root: {
        padding: 30
    },
    button: {
        marginTop: 20
    }
}

class FormCategory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: this.props.match.params.id !== undefined ? this.props.match.params.id : '',
            selectedParent: 'NoParent'
        }
    }

    componentDidMount() {
        const { id } = this.state
        this.props.fetchSingleCategory(id)
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { success, history, reset } = this.props
            if (success !== undefined && success !== '') {
                setTimeout(() => {
                    reset('FormCategory')
                    history.push({ pathname: '/admin/category' })
                }, 1000)
            }
        }
    }

    submit = (data) => {
        if (this.state.id === '') {
            this.props.createCategory(data)
        } else {
            data.id = this.state.id
            this.props.updateCategory(data)
        }

    }

    render() {
        const { history, classes, loading, loadingSubmit, handleSubmit } = this.props

        if (loading) return <Loading/>

        return (
            <Fade in={true}>
                <div>
                    <Subheader back title="Form Category" history={history}/>
                    <Card>
                        <form className={classes.root} onSubmit={handleSubmit(this.submit)}>
                            <Grid container spacing={2}>
                                <Grid item sm={12}>
                                    <Typography variant="caption">Category Name</Typography>
                                    <Field
                                        fullWidth
                                        placeholder="Category Name"
                                        name="name"
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
        )
    }
}

const mapStateToProps = ({ category }) => {
    const { single } = category
    let initial = {}
    if (single.category) {
        initial.name = single.category.name
    }
    return {
        initialValues: initial,
        loading: category.single.loading,
        categories: category.all.categories,
        error: category.all.error,
        loadingSubmit: category.create.loading,
        success: category.create.success || category.update.success
    }
}

const mapDispatchToProps = {
    fetchCategories,
    fetchSingleCategory,
    createCategory,
    updateCategory
}

const Form = reduxForm({
    form: 'FormCategory',
    enableReinitialize: true,
})(FormCategory)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Form))