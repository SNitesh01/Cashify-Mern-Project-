import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import {Fade} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Subheader from "../../components/basic/Subheader";
import CustomTable from "../../components/basic/CustomTable";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";
import colors from "../../constants/colors";
import { fetchCategories, deleteCategory } from "../../actions";
import Box from "@material-ui/core/Box";
import { CategorySort } from "../../constants/sort"
import CustomSelectField from "../../components/custom/CustomSelectField";
import CustomTextField from "../../components/custom/CustomTextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import ListMenu from "../../components/ListMenu";
import ErrorFetch from "../../components/warning/ErrorFetch";
import Loading from "../../components/skeleton/Loading";
import Chip from "@material-ui/core/Chip";
import ROLE from "../../constants/role";

const styles = {
    root: {
        textAlign: 'center'
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
    drawer: {
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 700,
        padding: 10,
        textAlign: 'center'
    },
    form: {
        padding: 30
    }
}

class Category extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            selectedCategory: '',
            formOpen: false,
            parentSelected: '',
            sort: CategorySort.NEWEST,
            keyword: '',
            page: 0,
            limit: 20
        }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser.user.role !== ROLE.Admin) {
            this.props.history.replace('/admin')
        }

        this.fetchCategoriesData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.success !== prevProps.success) {
            const { success } = this.props
            if (success && success !== '') {
                this.fetchCategoriesData()
            }
        }
    }

    fetchCategoriesData = () => {
        const { keyword, sort, page, limit } = this.state
        let params = { page, limit, sort }
        if (keyword) params['keyword'] = keyword

        this.props.fetchCategories(params)
}

    handleFilterChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.fetchCategoriesData()
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
            this.fetchCategoriesData()
        })
    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: 'category/update/' + id })
    }

    handleDelete = (id) => {
        this.props.deleteCategory({ id })
    }

    renderBottom = () => {
        const { page } = this.state
        const { categories, loading, pagination } = this.props
        if (categories.length !== 0) {
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
        const { sort, keyword, page } = this.state
        const { history, classes, categories, loading, error } = this.props

        if (loading && page === 0) return <ListSkeleton/>

        if (error && error !== '') return <ErrorFetch onClick={() => this.fetchCategoriesData()}/>

        return (
            <Fade in={true}>
                <div className={classes.root}>
                    <Subheader title="Category Lists">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<AddIcon/>}
                            onClick={() => history.push({
                                pathname: 'category/create'
                            })}>
                            New Data
                        </Button>
                    </Subheader>

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
                            <Grid item xs={4} lg={3}>
                                <CustomSelectField
                                    fullWidth
                                    size="small"
                                    label="Sort By"
                                    name="sort"
                                    value={sort}
                                    onChange={this.handleFilterChange}
                                >
                                    {Object.keys(CategorySort).map((key) => (
                                        <MenuItem key={key} value={CategorySort[key]}>
                                            {CategorySort[key]}
                                        </MenuItem>
                                    ))}
                                </CustomSelectField>
                            </Grid>
                        </Grid>
                    </Box>

                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Category Name</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { categories.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={2} align="center">
                                        No Data
                                    </TableCell>
                                </TableRow>
                            )}
                            {categories.map((category, i) => (
                                <TableRow key={i}>
                                    <TableCell>{category.name}</TableCell>
                                    <TableCell align="right">
                                        <ListMenu
                                            item={category}
                                            handleEdit={this.handleEdit}
                                            handleDelete={this.handleDelete}
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

const mapStateToProps = ({ category }) => {
    return {
        loading: category.all.loading,
        categories: category.all.categories,
        pagination: category.all.pagination,
        error: category.all.error,
        success: category.delete.success
    }
}

const mapDispatchToProps = {
    fetchCategories,
    deleteCategory
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Category))