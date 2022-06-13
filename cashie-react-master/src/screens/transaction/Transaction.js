import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import {connect} from "react-redux";
import classNames from "classnames";
import Box from "@material-ui/core/Box";
import Cart from "../../components/checkout/Cart";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import ProductItem from "../../components/checkout/ProductItem";
import Paper from "@material-ui/core/Paper";
import colors from "../../constants/colors";
import {fetchTransactionProducts, createTransaction, fetchSetting} from "../../actions";
import CheckoutSkeleton from "../../components/skeleton/CheckoutSkeleton";
import CheckoutDialog from "../../components/custom/CheckoutDialog";


const styles = theme => ({
    root: {
        width: 'calc(100%)',
        height: 'calc(100vh - 155px)',
        display: 'flex'
    },
    productPanel: {
        width: '65%',
        [theme.breakpoints.down('md')]: {
            width: '55%',
        },
        height: '100%',
        background: colors.white,
        marginRight: 15,
        borderRadius: 20,
    },
    tabs: {
        marginTop: 12
    },
    noProducts: {
        width:'100%',
        textAlign: 'center',
        marginTop: 50
    },
    productGrid: {
        maxHeight: 'calc(100vh - 200px)',
        padding: 15,
        overflow: 'scroll',
        overflowX: 'hidden'
    },
    hide: {
        display: 'none'
    },
    checkoutPanel: {
        width: '35%',
        [theme.breakpoints.down('md')]: {
            width: '45%',
        },
    }
})

class Transaction extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page: 0,
            group: 'category',
            limit: 10,
            tabSelected: 'all',
            checkout: {
                items: [],
                taxAmount: 0,
                discountAmount: 0,
                subtotal: 0,
                grandtotal: 0,
                dialog: false
            },
        }
    }

    componentDidMount() {
        this.fetchTransactionData()
        this.props.fetchSetting()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            const { loading, success } = this.props

            if (this.state.tabSelected === '' && !loading) {
                this.setState({
                    tabSelected: this.props.products[0]._id._id
                })
            }

            if (success) {
                let { checkout } = this.state
                checkout.dialog = true
                this.setState({
                    checkout
                })
            }
        }
    }

    componentWillUnmount() {
        this.setState({
            tabSelected: ''
        })
    }

    fetchTransactionData = () => {
        const { page, limit } = this.state
        this.props.fetchTransactionProducts({ page, limit })
    }

    handleTabs(event, value) {
        this.setState({
            tabSelected: value
        })
    }

    renderTabs = () => {
        const { categories } = this.props
        let tabs = [
            {
                _id: 'all',
                name: 'All'
            }
        ]
        categories.forEach((item) => {
            tabs.push({ _id: item._id, name: item.name })
        })

        return tabs.map((item, i) => (
            <Tab key={i} label={item.name} value={item._id}/>
        ))
    }

    renderProducts = () => {
        const { tabSelected, checkout } = this.state
        const { classes, products, categories } = this.props
        let product = []
        product.push({
            _id: 'all',
            items: products
        })
        categories.forEach((item) => {
            product.push({
                _id: item._id,
                items: item.items
            })
        })

        if (products.length === 0) {
            return (
                <Box className={classes.noProducts}>No Products</Box>
            )
        }

        return product.map((item, i) => (
            <Box key={i} className={classNames(
                classes.productGrid,
                tabSelected !== item._id && classes.hide
            )}>
                <Grid container spacing={1}>
                    { item.items.map((product, j) => (
                        <Grid key={j} item lg={2} sm={6}>
                            <ProductItem
                                onClick={() => this.changeProduct(product)}
                                selected={checkout.items.find(item => item._id === product._id)}
                                name={product.name}
                                price={ product.price }
                                image={ product.image }/>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        ))
    }

    calculateTotal = (items) => {
        const { setting } = this.props
        let { checkout } = this.state
        let subtotal = 0
        let grandtotal = 0
        let taxAmount = 0
        let discountAmount = 0
        items.forEach(item => {
            subtotal += parseInt(item.price) * item.qty
            grandtotal += parseInt(item.price) * item.qty
        })
        console.log(items)
        if (parseInt(setting.tax) !== 0) {
            taxAmount = ((setting.tax/100)*grandtotal).toFixed(2)
            grandtotal = parseFloat(grandtotal) + parseFloat(taxAmount)
        }
        if (parseInt(setting.discount) !== 0) {
            discountAmount = ((setting.discount/100)*grandtotal).toFixed(2)
            grandtotal = grandtotal - parseFloat(discountAmount)
        }
        checkout = {
            ...checkout,
            subtotal,
            taxAmount,
            discountAmount,
            grandtotal: grandtotal.toFixed(2)
        }
        this.setState({
            checkout
        })
    }

    changeProduct = (product) => {
        let { checkout } = this.state
        product.qty = 1
        let products = [...checkout.items, product]
        if (checkout.items.find(item => item._id === product._id)) {
            products = checkout.items.filter(item => item._id !== product._id)
        }
        checkout = { ...checkout, items: products }
        this.setState({
            checkout
        }, () => {
            this.calculateTotal(products)
        })
    }

    changeQty = (id, qty) => {
        let { checkout } = this.state
        const { items } = checkout
        let product = items.findIndex(item => item._id === id)
        if (product !== -1) {
            if (qty === 0) {
                items.splice(product, 1)
            } else {
                items[product].qty = qty
            }
        }
        checkout.items = items
        this.setState({
            checkout
        }, () => {
            this.calculateTotal(items)
        })
    }

    deleteItem = (id) => {
        let { items } = this.state
        let product = items.findIndex(item => item._id === id)
        if (product !== -1) {
            items.splice(product, 1)
        }
        this.setState({
            items
        })
    }

    pay = () => {
        const { checkout } = this.state
        const { items, subtotal, discountAmount, grandtotal } = checkout
        let params = { items, subtotal, grandtotal }
        params.discount = discountAmount

        this.props.createTransaction(params)
    }

    cancelCheckout = () => {
        this.setState({
            checkout: {
                items: [],
                taxAmount: 0,
                discountAmount: 0,
                subtotal: 0,
                grandtotal: 0,
                dialog: false
            },
        })
    }

    closeDialog = () => {
        this.setState({
            checkout: {
                items: [],
                discount: 10,
                discountAmount: 0,
                subtotal: 0,
                grandtotal: 0,
                dialog: false
            },
        })
    }

    render() {
        const { tabSelected, checkout } = this.state
        const { items, subtotal, discountAmount, taxAmount, grandtotal, dialog } = checkout
        const { classes, loading, transaction, submitLoading } = this.props

        if (loading) return <CheckoutSkeleton/>

        return (
            <div>
                <Box className={classes.root} >
                    <CheckoutDialog
                        open={dialog}
                        { ...transaction }
                        onClose={this.closeDialog}
                    />

                    <Box className={classes.productPanel}>
                        <Paper elevation={0}>
                            <Tabs
                                className={classes.tabs}
                                value={tabSelected}
                                onChange={(event, value) => this.handleTabs(event, value)}
                                scrollButtons="auto"
                                variant="scrollable">
                                { this.renderTabs() }
                            </Tabs>
                        </Paper>
                        { this.renderProducts() }
                    </Box>
                    <Box className={classes.checkoutPanel}>
                        <Cart
                            items={items}
                            subtotal={subtotal}
                            tax={taxAmount}
                            discount={discountAmount}
                            grandtotal={grandtotal}
                            changeQty={this.changeQty}
                            deleteItem={this.deleteItem}
                            payClick={this.pay}
                            cancelClick={this.cancelCheckout}
                            disabled={submitLoading}
                        />
                    </Box>
                </Box>
            </div>
        )
    }
}

const mapStateToProps = ({  product, transaction, setting }) => {
    const { create } = transaction
    const { single } = setting

    return {
        loading: product.transaction.loading,
        setting: !single.loading && single.setting,
        products: product.transaction.products,
        categories: product.transaction.categories,
        submitLoading: create.loading,
        error: create.error,
        success: create.success,
        transaction: create.data
    }
}

const mapDispatchToProps = {
    fetchTransactionProducts,
    createTransaction,
    fetchSetting
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Transaction))