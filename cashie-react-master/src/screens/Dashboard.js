import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames from "classnames";
import Fade from "@material-ui/core/Fade";
import { AreaChart } from 'react-chartkick';
import 'chart.js';
import Subheader from "../components/basic/Subheader";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import colors from "../constants/colors";
import OnlineShopping from "../assets/widget/004-online shopping.svg";
import Money from "../assets/widget/007-money.svg";
import Wallet from "../assets/widget/033-wallet.svg";
import Card from "@material-ui/core/Card";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import {fetchTransactions, fetchDashboard} from "../actions";
import {connect} from "react-redux";
import ListSkeleton from "../components/skeleton/ListSkeleton";
import ErrorFetch from "../components/warning/ErrorFetch";
import {DefaultSort} from "../constants/sort";
import Table from "@material-ui/core/Table";
import moment from "moment";

const styles = {
    widget: {
        height: 90,
        padding: 15,
        borderRadius: 20,
        display: 'flex',
        justifyContent: 'space-between',
        '& img': {
            height: '100%'
        }
    },
    widgetCount: {
        alignItems: 'flex-end',
    },
    widgetAmount: {
        alignItems: 'flex-start',
    },
    widget1: {
        background: 'linear-gradient(16deg, rgba(234,81,121,1) 0%, rgba(172,54,115,1) 100%)'
    },
    widget2: {
        background: 'linear-gradient(16deg, rgba(195,84,215,1) 0%, rgba(136,74,206,1) 100%)'
    },
    widget3: {
        background: 'linear-gradient(16deg, rgba(245,90,158,1) 0%, rgba(255,155,106,1) 100%)'
    },
    icon: {
        color: colors.white,
        opacity: 0.5
    },
    label: {
        fontSize: 14,
        color: colors.white
    },
    count: {
        fontSize: 42,
        fontWeight: 700,
        color: colors.white,
    },
    amount: {
        fontSize: 34,
        fontWeight: 700,
        color: colors.white,
    },
    chart: {
        height: 400,
        marginTop: 30,
        padding: 15,
        paddingLeft: 30,
        '& h4': {
            marginTop: 15,
            marginBottom: 15,
            fontSize: 20,
            fontWeight: 500
        }
    },
    recent: {
        height: 400,
        marginTop: 30,
        marginBottom: 30,
        padding: 15,
        '& h4': {
            marginTop: 15,
            marginBottom: 15,
            fontSize: 20,
            fontWeight: 500
        },
        '& table': {
            '& td': {
                borderBottom: `1px solid ${colors.lightgrey}`
            }
        }
    }
}

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        const curr = new Date();
        this.state = {
            start: new Date(curr.setDate(curr.getDate() - curr.getDay())),
            end: new Date(curr.setDate(curr.getDate() - curr.getDay()+6)),
            sort: DefaultSort.NEWEST,
            limit: 5,
            page: 0,
            chartData: []
        }
    }

    componentDidMount() {
        this.fetchDashboardData()
        this.fetchTransactionData()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { loading, error, items } = this.props
            if (!loading && !error && items) {
                this.generateChartData(items)
            }
        }
    }

    fetchTransactionData = () => {
        const { sort, limit, start, end, page } = this.state
        let params = { sort, limit, start, end, page }

        this.props.fetchTransactions(params)
    }

    fetchDashboardData = () => {
        this.props.fetchDashboard(this.state)
    }

    generateChartData = (items) => {
        let chartData = []
        let income = {
            name: 'Income',
            data: {
                Sunday: null,
                Monday: null,
                Tuesday: null,
                Wednesday: null,
                Thursday: null,
                Friday: null,
                Saturday: null,
            }
        }
        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        if (items) {
            items.forEach(item => {
                const day = days[parseInt(item._id) - 1]
                income.data[day] = item.grandtotal
            })
            chartData.push(income)
            this.setState({
                chartData
            })
        }
    }

    getQty = (items) => {
        let qty = 0
        items.forEach(item => {
            qty += item.qty
        })

        return qty
    }

    render() {
        const { chartData } = this.state
        const { classes, loading, error, count, total, qty, recent } = this.props

        if (loading) return <ListSkeleton/>

        if (error) return <ErrorFetch onClick={this.fetchDashboardData}/>

        return (
            <Fade in={true}>
                <div>
                    <Subheader title="Dashboard"/>

                    <Grid container spacing={2}>
                        <Grid item lg={4} sm={12} xs={12}>
                            <Box className={classNames(
                                classes.widget,
                                classes.widgetCount,
                                classes.widget1)}>
                                <div>
                                    <Typography className={classes.count}>
                                        {count}
                                    </Typography>
                                    <Typography className={classes.label}>
                                        Transaction
                                    </Typography>
                                </div>
                                <img className={classes.icon} src={OnlineShopping} alt="shopping"/>
                            </Box>
                        </Grid>
                        <Grid item lg={4} sm={12} xs={12}>
                            <Box className={classNames(
                                classes.widget,
                                classes.widget2,
                                classes.widgetAmount)}>
                                <div>
                                    <Typography className={classes.amount}>
                                        ${parseFloat(total).toFixed(2)}
                                    </Typography>
                                    <Typography className={classes.label}>
                                        Income
                                    </Typography>
                                </div>
                                <img className={classes.icon} src={Money} alt="money"/>
                            </Box>
                        </Grid>
                        <Grid item lg={4} sm={12} xs={12}>
                            <Box className={classNames(
                                classes.widget,
                                classes.widget3,
                                classes.widgetCount)}>
                                <div>
                                    <Typography className={classes.count}>
                                        {qty}
                                    </Typography>
                                    <Typography className={classes.label}>
                                        Products
                                    </Typography>
                                </div>
                                <img className={classes.icon} src={Wallet} alt="wallet"/>
                            </Box>
                        </Grid>
                    </Grid>

                    <Grid container spacing={3}>
                        <Grid item lg={6} xs={12}>
                            <Card className={classes.chart}>
                                <Typography variant="h4">Weekly Chart</Typography>
                                <AreaChart
                                    round={2}
                                    data={chartData}
                                    colors={[colors.pink]} />
                            </Card>
                        </Grid>
                        <Grid item lg={6} xs={12}>
                            <Card className={classes.recent}>
                                <Typography variant="h4">Recent Transaction</Typography>
                                <Table>
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Receipt Number</TableCell>
                                            <TableCell>Date</TableCell>
                                            <TableCell>Qty</TableCell>
                                            <TableCell>Total</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {recent.length === 0 && (
                                            <TableRow>
                                                <TableCell colSpan={4} align="center">
                                                    No Data
                                                </TableCell>
                                            </TableRow>
                                        )}
                                        {recent.map((item, i) => (
                                            <TableRow key={i}>
                                                <TableCell>{item._id}</TableCell>
                                                <TableCell>{ moment(item.createdAt).format('MMMM Do YYYY, HH:mm') }</TableCell>
                                                <TableCell>{ this.getQty(item.products) }</TableCell>
                                                <TableCell>${ item.grandtotal }</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </Grid>
                    </Grid>
                </div>
            </Fade>
        );
    }
}

const mapStateToProps = ({ transaction }) => {
    const { dashboard, all } = transaction
    const { loading, error, count, total, qty, items } = dashboard
    return {
        loading: loading && all.loading,
        error,
        count,
        total,
        qty,
        items,
        recent: all.transactions
    }
}

const mapDispatchToProps = {
    fetchDashboard,
    fetchTransactions
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Dashboard))