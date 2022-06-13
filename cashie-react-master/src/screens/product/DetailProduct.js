import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CustomDialog from "../../components/custom/CustomDialog";
import colors from "../../constants/colors";
import Chip from "@material-ui/core/Chip";

const styles = {
    table: {
        '& th': {
            fontWeight: 500,
            color: colors.grey
        },
        '& td': {
            fontWeight: 600,
            color: colors.dark
        }
    },
    image: {
        width: 150
    },
    chip: {
        color: colors.white,
        background: colors.fanta,
        margin: 5
    }
}

class DetailProduct extends React.Component {
    renderCategory = (category) => {
        const { classes } = this.props
        if (category !== undefined && category.length !== 0) {
            return (
                <Chip label={category[0].name} size="small" className={classes.chip}/>
            )
        }
        return (
            <>-</>
        )
    }

    render() {
        const { open, onClose, product, classes } = this.props

        return (
            <CustomDialog
                open={open}
                onClose={onClose}
                title={product.name}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell rowSpan={4} width={100}>
                                <img alt="product" src={product.image} className={classes.image}/>
                            </TableCell>
                            <TableCell component="th" width={50}>Name</TableCell>
                            <TableCell>{ product.name }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" width={50}>Price</TableCell>
                            <TableCell>${ product.price }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" width={50}>Categories</TableCell>
                            <TableCell>{ this.renderCategory(product.category) }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th" width={50}>Description</TableCell>
                            <TableCell>{ product.description ? product.description : '-' }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CustomDialog>
        );
    }
}

export default withStyles(styles)(DetailProduct)
