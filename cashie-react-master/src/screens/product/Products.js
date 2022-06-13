import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import colors from "../../constants/colors";
import {Fade} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Subheader from "../../components/basic/Subheader";
import CustomTable from "../../components/basic/CustomTable";
import { fetchProducts, deleteProduct } from "../../actions";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import ErrorFetch from "../../components/warning/ErrorFetch";
import Chip from "@material-ui/core/Chip";
import ListMenu from "../../components/ListMenu";
import DetailProduct from "./DetailProduct";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import CustomTextField from "../../components/custom/CustomTextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import CustomSelectField from "../../components/custom/CustomSelectField";
import { ProductSort } from "../../constants/sort";
import MenuItem from "@material-ui/core/MenuItem";
import ProductPlaceholder from "../../assets/product-placeholder.png"
import Loading from "../../components/skeleton/Loading";

const styles = (theme) => ({
    root: {
        padding: 30,
        textAlign: 'center'
    },
    header: {
        fontSize: 24,
        fontWeight: 700,
        color: colors.dark
    },
    filter: {
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end',
        marginTop: 10,
        '& .MuiOutlinedInput-root': {
            background: colors.white
        },
        '& .MuiSelect-select': {
            background: colors.white,
        }
    },
    image: {
        width: 60,
        height: 60,
        display: 'flex',
        paddingLeft: 20,
        '& img': {
            maxWidth: '100%',
            maxHeight: '100%'
        }
    },
    chip: {
        color: colors.white,
        background: colors.fanta,
        margin: 5
    }
})

class Products extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            keyword: '',
            sort: ProductSort.NEWEST,
            page: 0,
            limit: 20,
            lastPage: false,
            detailModal: ''
        }
    }

    componentDidMount() {
        this.fetchProductsData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.success !== prevProps.success) {
            const { success } = this.props
            if (success && success !== '') {
                this.setState({
                    page: 0
                }, () => {
                    this.fetchProductsData()
                })
            }
        }
    }

    fetchProductsData = () => {
        const { keyword, sort, page, limit } = this.state
        let params = { page, limit }
        if (keyword) params['keyword'] = keyword
        if (sort) params['sort'] = sort

        this.props.fetchProducts(params)
    }

    handleFilterChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
            page: 0
        }, () => {
            this.fetchProductsData()
        })
    }

    changeKeyword = (e) => {
        this.setState({
            keyword: e.target.value
        })
    }

    loadMore = () => {
        let { page } = this.state
        this.setState({
            page: page + 1
        }, () => {
            this.fetchProductsData()
        })
    }

    handleDetail = (item) => {
        this.setState({
            detailModal: this.state.detailModal === '' ? item : ''
        })
    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: 'product/update/' + id })
    }

    handleDelete = (id) => {
        this.props.deleteProduct({ id })
    }

    renderBottom = () => {
        const { page } = this.state
        const { products, loading, pagination } = this.props
        if (products.length !== 0) {
            return (
                <div>
                    { (loading && page !== 0) ? <Loading/> : <></>}
                    { !loading && pagination && !pagination.lastPage ? (
                        <Button
                            variant="outlined"
                            color="primary"
                            size="small"
                            onClick={this.loadMore}>
                            Load More
                        </Button>
                    ): (
                        <Chip label="End of Data"/>
                    )}
                </div>
            )
        }
    }

    render() {
        const { keyword, sort, page, detailModal } = this.state
        const { history, classes, products, loading, error } = this.props

        if (loading && page === 0) return <ListSkeleton/>

        if (error) return <ErrorFetch/>

        return (
            <Fade in={true}>
                <div className={classes.root}>
                    <Subheader title="Product Lists">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<AddIcon/>}
                            onClick={() => history.push({
                                pathname: 'product/create'
                            })}>
                            New Data
                        </Button>
                    </Subheader>

                    <DetailProduct
                        open={detailModal !== ''}
                        onClose={this.handleDetail}
                        product={detailModal}
                    />

                    <Box className={classes.filter}>
                        <Grid container spacing={2} justify="flex-end">
                            <Grid item xs={5} lg={3}>
                                <CustomTextField
                                    fullWidth
                                    size="small"
                                    placeholder="Keyword"
                                    label="Search"
                                    value={keyword}
                                    onChange={this.changeKeyword}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={this.handleFilterChange}>
                                                    <SearchIcon fontSize="small"/>
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </Grid>
                            <Grid item xs={5} lg={3}>
                                <CustomSelectField
                                    fullWidth
                                    size="small"
                                    placeholder="Sort By"
                                    label="Sort By"
                                    name="sort"
                                    value={sort}
                                    onChange={this.handleFilterChange}
                                >
                                    {Object.keys(ProductSort).map((key) => (
                                        <MenuItem key={key} value={ProductSort[key]}>
                                            {ProductSort[key]}
                                        </MenuItem>
                                    ))}
                                </CustomSelectField>
                            </Grid>
                        </Grid>
                    </Box>

                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Image</TableCell>
                                <TableCell>Name</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Category</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { products.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No Data
                                    </TableCell>
                                </TableRow>
                            )}
                            {products.map((product, i) => (
                                <TableRow key={ i }>
                                    <TableCell>
                                        <Box className={classes.image}>
                                            { product.image ? (
                                                <img alt="product" src={ product.image }/>
                                            ) : (
                                                <img alt="product" src={ ProductPlaceholder }/>
                                            )}

                                        </Box>
                                    </TableCell>
                                    <TableCell>{ product.name }</TableCell>
                                    <TableCell>${ product.price }</TableCell>
                                    <TableCell>
                                        {
                                            product.category && product.category.length !== 0 ? (
                                                <Chip label={product.category[0].name} size="small" className={classes.chip}/>
                                            ) : '-'
                                        }
                                    </TableCell>
                                    <TableCell align="right">
                                        <ListMenu
                                            item={product}
                                            handleEdit={this.handleEdit}
                                            handleDelete={this.handleDelete}
                                            handleDetail={this.handleDetail}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>

                    { this.renderBottom() }

                </div>
            </Fade>
        );
    }
}

const mapStateToProps = ({ product }) => {
    return {
        loading: product.all.loading,
        products: product.all.products,
        pagination: product.all.pagination,
        error: product.all.error,
        success: product.delete.success
    }
}

const mapDispatchToProps = {
    fetchProducts,
    deleteProduct
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Products))