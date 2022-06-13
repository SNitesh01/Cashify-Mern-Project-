import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Field, reduxForm } from 'redux-form';
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import InputAdornment from "@material-ui/core/InputAdornment";
import MenuItem from "@material-ui/core/MenuItem";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import colors from "../../constants/colors";
import Subheader from "../../components/basic/Subheader";
import GradientButton from "../../components/basic/GradientButton";
import CustomTextField from "../../components/custom/CustomTextField";
import CustomTextArea from "../../components/custom/CustomTextArea";
import CustomFilePicker from "../../components/custom/CustomFilePicker";
import {
    fetchCategories,
    fetchSingleProduct,
    createProduct,
    updateProduct,
} from "../../actions";
import {connect} from "react-redux";
import Loading from "../../components/skeleton/Loading";
import CustomSelectField from "../../components/custom/CustomSelectField";
import CustomCropper from "../../components/custom/CustomCropper";

const styles = {
    upload: {
        marginTop: 10,
        display: 'flex',
        flexDirection: 'column',

    },
    image: {
        width: 300,
        marginBottom: 10
    },
    button: {
        width: 100,
        height: 50,
        margin: 10,
        background: colors.lightgrey,
    },
    chips: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingTop: 10,
        paddingBottom: 10
    },
    chip: {
        margin: 3,
        background: colors.white
    },
    cropperDialog: {
        width: 500,
        height: 500,
        position: 'relative'
    }
}

function getStyles(name, personName) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? 400
                : 600,
    };
}

class FormProduct extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            id: this.props.match.params.id !== undefined ? this.props.match.params.id : '',
            selectedCategory: '',
            tempImage: '',
            finalImage: '',
            crop: { x: 0, y: 0 },
            zoom: 1
        }
    }

    componentDidMount() {
        const { id } = this.state
        this.props.fetchSingleProduct(id)
        this.props.fetchCategories()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { product, success, history, reset } = this.props
            const { finalImage } = this.state

            if (!product.loading && product.product.image && finalImage === '') {
                this.setState({
                    finalImage: product.product.image
                })
            }

            if (success !== undefined && success !== '') {
                setTimeout(() => {
                    reset('FormProduct')
                    history.push({ pathname: '/admin/product' })
                }, 1000)
            }
        }
    }

    handleCategory = (e) => {
        this.setState({
            selectedCategory: e.target.value
        })
    }

    handleCapture = ({ target }) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(target.files[0]);
        fileReader.onload = (e) => {
            this.setState((prevState) => ({
                tempImage: e.target.result
            }));
        };
    };

    handleCaptureDialog = (image) => {
        this.setState({
            tempImage: '',
            finalImage: image
        })
    }

    closeCaptureDialog = () => {
        this.setState({
            tempImage: ''
        })
    }

    submit = (data) => {
        const { finalImage } = this.state
        if (data.image) data.image = finalImage
        if (data.category === undefined) delete data.category
        if (data.description === undefined) delete data.description
        if (this.state.id === '') {
            this.props.createProduct(data)
        } else {
            data.id = this.state.id
            this.props.updateProduct(data)
        }
    }

    render() {
        const { selectedCategory, tempImage, finalImage } = this.state
        const { history, classes, handleSubmit, loading, categories, submitLoading, formError } = this.props

        if (loading) return <Loading/>

        return (
            <Fade in={true}>
                <div>
                    <Subheader back title="Form Product" history={history}/>

                    <CustomCropper
                        open={tempImage !== ''}
                        image={tempImage}
                        onClose={this.closeCaptureDialog}
                        handleCaptureDialog={this.handleCaptureDialog}
                    />

                    <Card>
                        <form onSubmit={handleSubmit(this.submit)}>
                            <Grid container spacing={3} justify="flex-end">
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        placeholder="Name"
                                        name="name"
                                        label="Name"
                                        component={CustomTextField}
                                        error={formError && formError['name'] !== ''}
                                        helperText={formError && formError['name']}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Field
                                        fullWidth
                                        placeholder="Price"
                                        name="price"
                                        label="Price"
                                        component={CustomTextField}
                                        error={formError && formError['price'] !== ''}
                                        helperText={formError && formError['price']}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">$</InputAdornment>
                                            ),
                                        }}
                                        type="number"
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        rows={4}
                                        label="Description"
                                        placeholder="Product description"
                                        name="description"
                                        component={CustomTextArea}
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <Field
                                        fullWidth
                                        label="Category"
                                        name="category"
                                        component={CustomSelectField}
                                        value={selectedCategory}
                                        onChange={this.handleCategory}
                                    >
                                        {categories.map((item, i) => (
                                            <MenuItem key={i} value={item._id} style={getStyles(item._id, selectedCategory)}>
                                                { item.name }
                                            </MenuItem>
                                        ))}
                                    </Field>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="caption">Images</Typography>
                                    <Box className={classes.upload}>
                                        { finalImage !== '' && (
                                            <img
                                                alt="product"
                                                className={classes.image}
                                                src={finalImage}/>
                                        )}
                                        <Field
                                            name="image"
                                            type="file"
                                            onChange={this.handleCapture}
                                            onClick={(event)=> {
                                                event.currentTarget.value = null
                                            }}
                                            component={CustomFilePicker} />
                                    </Box>
                                </Grid>
                                <Grid item xs={3}>
                                    <GradientButton
                                        fullWidth
                                        disabled={submitLoading}
                                        type="submit">
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

const mapStateToProps = ({ category, product }) => {
    const { all } = category
    const { single, create, update } = product

    let initial = {}
    if (!single.loading) {
        initial.name = single.product.name
        initial.price = single.product.price
        if (single.product.description) initial.description = single.product.description
        if (single.product.category) initial.category = single.product.category
    }

    return {
        initialValues: initial,
        product: single,
        loading: all.loading,
        categories: all.categories,
        submitLoading: create.loading || update.loading,
        error: all.error,
        formError: create.error || update.error,
        success: create.success || update.success
    }
}

const mapDispatchToProps = {
    fetchCategories,
    fetchSingleProduct,
    createProduct,
    updateProduct
}

const Form = reduxForm({
    form: 'FormProduct',
    enableReinitialize: true,
})(FormProduct)

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Form))