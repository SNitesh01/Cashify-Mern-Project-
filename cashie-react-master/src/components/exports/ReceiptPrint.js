import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import {formattedDate} from "../../common/datetime";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import colors from "../../constants/colors";

const styles = {
    box: {
        textAlign: 'center',
        padding: 25
    },
    title: {
        fontWeight: 500,
        fontSize: 30,
        color: colors.grey
    },
    table: {
        marginTop: 15,
        marginBottom: 15,
        '& .MuiTableHead-root': {
            borderTop: `2px solid ${colors.lightgrey}`,
            borderBottom: `2px solid ${colors.lightgrey}`,
            '& th': {
                padding: 10
            }
        },
        '& .MuiTableBody-root': {
            borderBottom: `2px solid ${colors.lightgrey}`,
        },
        '& td': {
            padding: 7
        }
    },
    calculateTable: {
        marginBottom: 20,
        '& th': {
            padding: 5,
            fontWeight: 500,
            borderBottom: `1px solid ${colors.lightgrey}`
        }
    },
    grandTotal: {
        color: colors.fanta,
        fontSize: 18,
        fontWeight: 600
    }
}

class ReceiptPrint extends React.Component {
    render() {
        const { classes, createdAt, id, products, subtotal, discount, grandtotal } = this.props

        return (
            <Box className={classes.box}>
                <Typography className={classes.title}>RECEIPT</Typography>
                <Typography variant="caption">{ formattedDate(createdAt) }</Typography><br/>
                <Typography variant="caption">{ id }</Typography>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Product</TableCell>
                            <TableCell align="center">Qty</TableCell>
                            <TableCell align="center">Unit Price</TableCell>
                            <TableCell align="right">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {products.map((item, i) => {
                            return (
                                <TableRow key={i}>
                                    <TableCell>
                                        <Typography variant="subtitle2">{ item.name }</Typography>
                                        <Typography variant="caption">{ item.description }</Typography>
                                    </TableCell>
                                    <TableCell align="center">{ item.qty }</TableCell>
                                    <TableCell align="center">${ item.price }</TableCell>
                                    <TableCell align="right">${ item.qty * item.price }</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
                <Table className={classes.calculateTable}>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th" colSpan={3} align="right">Subtotal</TableCell>
                            <TableCell component="th" align="right">${ subtotal }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" colSpan={3} align="right">Discount</TableCell>
                            <TableCell component="th" align="right">{ discount && `$${ discount }`}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" colSpan={3} align="right">
                                <Typography className={classes.grandTotal}>Grandtotal</Typography>
                            </TableCell>
                            <TableCell component="th" align="right">
                                <Typography className={classes.grandTotal}>${ grandtotal }</Typography>
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </Box>
        );
    }
}

export default withStyles(styles)(ReceiptPrint)