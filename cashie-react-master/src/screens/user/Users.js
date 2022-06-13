import React from "react";
import { connect } from "react-redux";
import withStyles from "@material-ui/core/styles/withStyles";
import {Fade} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import AddIcon from '@material-ui/icons/Add';
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Subheader from "../../components/basic/Subheader";
import CustomTable from "../../components/basic/CustomTable";
import { fetchUsers, deleteUser } from "../../actions";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import ErrorFetch from "../../components/warning/ErrorFetch";
import ListMenu from "../../components/ListMenu";
import ROLE from "../../constants/role";
import CustomChip from "../../components/custom/CustomChip";
import MenuItem from "@material-ui/core/MenuItem";
import Box from "@material-ui/core/Box";
import DetailUser from "./DetailUser";
import CustomTextField from "../../components/custom/CustomTextField";
import CustomSelectField from "../../components/custom/CustomSelectField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from '@material-ui/icons/Search';
import Grid from "@material-ui/core/Grid";
import colors from "../../constants/colors";
import {UserSort} from "../../constants/sort";
import {formattedDate} from "../../common/datetime";
import Chip from "@material-ui/core/Chip";
import Loading from "../../components/skeleton/Loading";

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
        }
    },
    role: {
        width: 100,
    }
}

class Users extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isAdmin: false,
            roles: {
                [ROLE.Admin]: <CustomChip role={ROLE.Admin} color="fanta"/>,
                [ROLE.Cashier]: <CustomChip role={ROLE.Cashier} color="blue"/>,
            },
            role: 'all',
            keyword: '',
            sort: UserSort.NEWEST,
            page: 0,
            limit: 20,
            detailModal: ''
        }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser.user.role !== ROLE.Admin) {
            this.props.history.replace('/admin')
        }

        this.fetchUserData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.success !== prevProps.success) {
            const { success } = this.props
            if (success && success !== '') {
                this.fetchUserData()
            }
        }
    }

    fetchUserData = () => {
        const { keyword, role, sort, limit, page } = this.state
        let params = {
            sort,
            limit,
            page
        }
        if (keyword) params['keyword'] = keyword
        if (role) params['role'] = role

        this.props.fetchUsers(params)
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
            this.fetchUserData()
        })
    }

    handleFilterChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.fetchUserData()
        })
    }

    handleDelete = (id) => {
        this.props.deleteUser({ id })
    }

    handleDetail = (item) => {
        this.setState({
            detailModal: item
        })
    }

    handleEdit = (id) => {
        this.props.history.push({ pathname: 'user/update/' + id })
    }

    handleCloseDetail = () => {
        this.setState({
            detailModal: ''
        })
    }

    render() {
        const { roles, role, keyword, sort, page, detailModal } = this.state
        const { history, classes, users, pagination, loading, error } = this.props

        if (loading && page === 0) return <ListSkeleton/>

        if (error && error !== '') return <ErrorFetch onClick={() => this.props.fetchUsers()}/>

        return (
            <Fade in={true}>
                <div className={classes.root}>
                    <Subheader title="Users Lists">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<AddIcon/>}
                            onClick={() => history.push({
                                pathname: 'user/create'
                            })}>
                            New Data
                        </Button>
                    </Subheader>

                    <DetailUser
                        open={detailModal !== ''}
                        onClose={this.handleCloseDetail}
                        user={detailModal}/>

                    <Box className={classes.filter}>
                        <Grid container spacing={2} justify="flex-end">
                            <Grid item sm={4} lg={3}>
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
                            <Grid item sm={4} lg={2}>
                                <CustomSelectField
                                    fullWidth
                                    size="small"
                                    label="Role"
                                    name="role"
                                    value={role}
                                    onChange={this.handleFilterChange}
                                >
                                    <MenuItem value='all'>All Role</MenuItem>
                                    {Object.keys(ROLE).map((key) => (
                                        <MenuItem key={key} value={ROLE[key]}>
                                            {ROLE[key]}
                                        </MenuItem>
                                    ))}
                                </CustomSelectField>
                            </Grid>
                            <Grid item sm={3} lg={2}>
                                <CustomSelectField
                                    fullWidth
                                    size="small"
                                    label="Sort By"
                                    name="sort"
                                    value={sort}
                                    onChange={this.handleFilterChange}
                                >
                                    {Object.keys(UserSort).map((key) => (
                                        <MenuItem key={key} value={UserSort[key]}>
                                            {UserSort[key]}
                                        </MenuItem>
                                    ))}
                                </CustomSelectField>
                            </Grid>
                        </Grid>
                    </Box>

                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Fullname</TableCell>
                                <TableCell>Username</TableCell>
                                <TableCell>Role</TableCell>
                                <TableCell>Last Active</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { users.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">
                                        No Data
                                    </TableCell>
                                </TableRow>
                            )}
                            {users.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{item.fullname}</TableCell>
                                    <TableCell>{item.username}</TableCell>
                                    <TableCell>{roles[item.role]}</TableCell>
                                    <TableCell>{formattedDate(item.lastActive)}</TableCell>
                                    <TableCell align="right">
                                        <ListMenu
                                            item={item}
                                            handleEdit={this.handleEdit}
                                            handleDelete={this.handleDelete}
                                            handleDetail={this.handleDetail}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </CustomTable>

                    { (loading && page !== 0) ? <Loading/> : <></>}
                    { !loading && !pagination.lastPage ? (
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
            </Fade>
        );
    }
}

const mapStateToProps = ({ user }) => {
    return {
        loading: user.all.loading,
        users: user.all.users,
        pagination: user.all.pagination,
        error: user.all.error,
        success: user.delete.success
    }
}

const mapDispatchToProps = {
    fetchUsers,
    deleteUser
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Users))