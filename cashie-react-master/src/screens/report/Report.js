import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import moment from "moment";
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import {Fade} from "@material-ui/core";
import Subheader from "../../components/basic/Subheader";
import DateRangeIcon from '@material-ui/icons/DateRange';
import CustomTable from "../../components/basic/CustomTable";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import {fetchTransactions} from "../../actions";
import {connect} from "react-redux";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Chip from "@material-ui/core/Chip";
import DescriptionIcon from '@material-ui/icons/Description';
import MenuItem from "@material-ui/core/MenuItem";
import CustomSelectField from "../../components/custom/CustomSelectField";
import colors from "../../constants/colors";
import {DefaultSort} from "../../constants/sort";
import ListMenu from "../../components/ListMenu";
import ListSkeleton from "../../components/skeleton/ListSkeleton";
import CheckoutDialog from "../../components/custom/CheckoutDialog";
import Loading from "../../components/skeleton/Loading";
import ROLE from "../../constants/role";

import {formatReportExcelName} from "../../common/datetime";

const styles = {
    root: {
        textAlign: 'center'
    },
    range: {
        '& .MuiInputBase-root': {
            width: '100%',
            height: 40,
            fontSize: 14,
            background: colors.white,
            borderRadius: 50,
            paddingLeft: 10
        },
    },
    rangeItem: {
          textAlign: 'left'
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

class Report extends React.Component {
    constructor(props) {
        super(props);

        var curr = new Date();
        var firstday = new Date(curr.setDate(curr.getDate() - curr.getDay()));
        var lastday = new Date(curr.setDate(curr.getDate() - curr.getDay()+6));
        this.state = {
            start: firstday,
            end: lastday,
            sort: DefaultSort.NEWEST,
            limit: 20,
            page: 0,
            detail: {
                open: false,
                item: ''
            }
        }
    }

    componentDidMount() {
        const currentUser = JSON.parse(localStorage.getItem('user'))
        if (currentUser.user.role !== ROLE.Admin) {
            this.props.history.replace('/admin')
        }

        this.fetchTransactionData()
    }

    fetchTransactionData = () => {
        const { sort, limit, start, end, page } = this.state
        let params = { sort, limit, start, end, page }

        this.props.fetchTransactions(params)
    }

    changeDate(value, name) {
        let { start, end } = this.state
        if (name === 'start') start = value
        if (name === 'end') end = value
        this.setState({
            start,
            end
        }, () => {
            this.fetchTransactionData()
        })
    }

    handleFilterChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, () => {
            this.fetchTransactionData()
        })
    }

    loadMore = () => {
        let { page } = this.state
        this.setState({
            page: page + 1
        }, () => {
            this.fetchTransactionData()
        })
    }

    getQty = (items) => {
        let qty = 0
        items.forEach(item => {
            qty += item.qty
        })

        return qty
    }

    handleDetail = (item) => {
        let { detail } = this.state
        if (!detail.open) {
            detail = {
                open: true,
                item
            }
            this.setState({
                detail
            })
        } else {
            this.setState({
                detail: {
                    open: false,
                    item: ''
                }
            })
        }
    }

    exportToXlsx = () => {
        const { transactions } = this.props
        const { start, end } = this.state
        const filename = formatReportExcelName(start, end)
        const csvData = transactions.map(({items, products, __v, ...rest}) => rest)
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8'
        const fileExtension = '.xlsx'
        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'report': ws }, SheetNames: ['report'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, filename + fileExtension);
    }

    renderBottom = () => {
        const { page } = this.state
        const { transactions, loading, pagination } = this.props
        if (transactions.length !== 0) {
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
        const { start, end, sort, detail, page } = this.state
        const { classes, loading, transactions } = this.props
        const { open, item } = detail

        if (loading && page === 0) return <ListSkeleton/>

        return (
            <Fade in={true}>
                <div className={classes.root}>
                    <Subheader title="Reports">
                        <Button
                            size="small"
                            variant="contained"
                            color="secondary"
                            startIcon={<DescriptionIcon/>}
                            onClick={() => this.exportToXlsx(transactions, 'transaction')}>
                            Export Data
                        </Button>
                    </Subheader>

                    <Box className={classes.filter}>
                        <Grid container spacing={2} justify="flex-end">
                            <Grid item xs={7} lg={4}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <Box className={classes.range}>
                                        <Grid container spacing={2}>
                                            <Grid item sm={6}>
                                                <Box className={classes.rangeItem}>
                                                    <Typography variant="caption">Start</Typography><br/>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        InputProps={{
                                                            disableUnderline: true,
                                                        }}
                                                        format="MM/dd/yyyy"
                                                        value={start}
                                                        onChange={(value) => this.changeDate(value, 'start')}
                                                        keyboardIcon={<DateRangeIcon fontSize="small" />}
                                                    />
                                                </Box>
                                            </Grid>
                                            <Grid item sm={6}>
                                                <Box className={classes.rangeItem}>
                                                    <Typography variant="caption">End</Typography><br/>
                                                    <KeyboardDatePicker
                                                        disableToolbar
                                                        InputProps={{
                                                            disableUnderline: true,
                                                        }}
                                                        format="MM/dd/yyyy"
                                                        value={end}
                                                        onChange={(value) => this.changeDate(value, 'end')}
                                                        keyboardIcon={<DateRangeIcon fontSize="small" />}
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Box>
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={3} lg={2}>
                                <CustomSelectField
                                    fullWidth
                                    size="small"
                                    label="Sort By"
                                    name="sort"
                                    value={sort}
                                    onChange={this.handleFilterChange}
                                >
                                    {Object.keys(DefaultSort).map((key) => (
                                        <MenuItem key={key} value={DefaultSort[key]}>
                                            {DefaultSort[key]}
                                        </MenuItem>
                                    ))}
                                </CustomSelectField>
                            </Grid>
                        </Grid>
                    </Box>

                    <CheckoutDialog
                        open={open}
                        { ...item }
                        onClose={this.handleDetail}
                    />

                    <CustomTable>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Qty</TableCell>
                                <TableCell>Grandtotal</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            { transactions.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        No Data
                                    </TableCell>
                                </TableRow>
                            )}
                            {transactions.map((item, i) => (
                                <TableRow key={i}>
                                    <TableCell>{ item._id }</TableCell>
                                    <TableCell>{ moment(item.createdAt).format('MMMM Do YYYY, HH:mm') }</TableCell>
                                    <TableCell>{ this.getQty(item.products) }</TableCell>
                                    <TableCell>${ item.grandtotal }</TableCell>
                                    <TableCell align="right">
                                        <ListMenu
                                            item={item}
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

const mapStateToProps = ({ transaction }) => {
    return {
        loading: transaction.all.loading,
        transactions: transaction.all.transactions,
        pagination: transaction.all.pagination,
        error: transaction.all.error,
        success: transaction.delete.success
    }
}

const mapDispatchToProps = {
    fetchTransactions,
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Report))