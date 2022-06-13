import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import colors from "../../constants/colors";
import GradientButton from "../basic/GradientButton";
import CartItem from "./CartItem";
import Grid from "@material-ui/core/Grid";
import CancelIcon from '@material-ui/icons/Cancel';
import Button from "@material-ui/core/Button";

const styles = (theme) => ({
    root: {
        height: 'calc(100% - 30px)',
        padding: 15,
        position: 'relative',
        background: colors.white,
        borderRadius: 20
    },
    title: {
        fontWeight: 700,
        fontSize: 20,
        color: colors.dark,
        textAlign: 'center'
    },
    content: {
        height: '70%'
    },
    carts: {
        maxHeight: '65%',
        overflow: 'scroll',
        overflowX: 'hidden',
        '& td': {
            fontSize: 12,
            fontWeight: 600
        }
    },
    noCart: {
        textAlign: 'center',
        marginTop: 30
    },
    qty: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingLeft: 0,
        paddingRight: 0
    },
    calculation: {
        background: colors.white,
        position: 'absolute',
        padding: 15,
        paddingBottom: 30,
        bottom: 0,
        left: 0,
        right: 0,
        borderRadius: 20
    },
    calcItem: {
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 14,
        marginBottom: 10,
        borderBottom: `1px solid ${colors.light}`
    },
    total: {
        fontSize: 18,
        fontWeight: 700,
        color: colors.dark
    },
    paper: {
        height: 200
    },
    cancel: {
        background: colors.grey,
        color: colors.white
    }
})

class Cart extends React.Component {
    render() {
        const { classes, items, subtotal, tax, discount, grandtotal,
            changeQty, deleteItem, payClick, cancelClick, disabled } = this.props

        return (
            <Box className={classes.root}>
                <Typography className={classes.title}>Cart</Typography>
                <Box className={classes.carts}>
                    <Box>
                        { items && items.length === 0 ? (
                            <Box className={classes.noCart}>
                                No Item
                            </Box>
                        ) : ''}
                        {items.map((item, i) => (
                            <CartItem
                                key={i}
                                {...item}
                                changeQty={changeQty}
                                deleteItem={deleteItem}
                            />
                        ))}
                    </Box>
                </Box>
                <Box className={classes.calculation}>
                    <Box className={classes.calcItem}>
                        <Typography variant="body2">Subtotal</Typography>
                        <Typography variant="body2">${subtotal}</Typography>
                    </Box>
                    { discount !== 0 && (
                        <Box className={classes.calcItem}>
                            <Typography variant="body2">Discount</Typography>
                            <Typography variant="body2">${discount}</Typography>
                        </Box>
                    )}
                    { tax !== 0 && (
                        <Box className={classes.calcItem}>
                            <Typography variant="body2">Tax</Typography>
                            <Typography variant="body2">${tax}</Typography>
                        </Box>
                    )}
                    <Box className={classes.calcItem}>
                        <Typography className={classes.total}>Grand Total</Typography>
                        <Typography className={classes.total}>${grandtotal}</Typography>
                    </Box>
                    <Grid container spacing={3}>
                        <Grid item xs={6} lg={6}>
                            <Button
                                fullWidth
                                variant="contained"
                                className={classes.cancel}
                                disabled={items.length === 0 || disabled}
                                startIcon={<CancelIcon/>}
                                onClick={cancelClick}>
                                Cancel
                            </Button>
                        </Grid>
                        <Grid item xs={6} lg={6}>
                            <GradientButton
                                fullWidth
                                onClick={payClick}
                                disabled={items.length === 0 || disabled}>
                                Pay
                            </GradientButton>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(Cart)