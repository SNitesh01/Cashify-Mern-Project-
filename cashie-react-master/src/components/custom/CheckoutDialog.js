import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import PrintIcon from '@material-ui/icons/Print';
import GradientButton from "../basic/GradientButton";
import Box from "@material-ui/core/Box";
import ReactToPrint from "react-to-print";
import ReceiptPrint from "../exports/ReceiptPrint";

const styles = {
    root: {
        width: 400,
        paddingBottom: 40,
    },
    paper: {
        borderRadius: 20,
        textAlign: 'center'
    },
    box: {
        width: '100%'
    },
    button: {
        marginLeft: 25,
        marginRight: 25
    }
}



class CheckoutDialog extends React.Component {
    render() {
        const { classes, open, createdAt, _id, products, subtotal, discount, grandtotal, onClose } = this.props

        if (!products) return <></>

        return (
            <Dialog
                open={open}
                onClose={onClose}
                classes={{
                    paper: classes.paper
                }}>
                <DialogContent className={classes.root}>
                    <div>
                        <ReceiptPrint
                            createdAt={createdAt}
                            id={_id}
                            products={products}
                            subtotal={subtotal}
                            discount={discount}
                            grandtotal={grandtotal}
                            ref={el => (this.componentRef = el)} />
                        <ReactToPrint
                            trigger={() => {
                                return (
                                    <Box className={classes.button}>
                                        <GradientButton fullWidth onClick={this.printOrder}>
                                            <PrintIcon/>
                                            Print Receipt
                                        </GradientButton>
                                    </Box>
                                )
                            }}
                            content={() => this.componentRef}
                        />
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
}

export default withStyles(styles)(CheckoutDialog)