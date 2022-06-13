import React, {PureComponent} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import RemoveCircleOutlineIcon from "@material-ui/icons/RemoveCircleOutline";
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import colors from "../../constants/colors";

const styles = {
    root: {
        display: 'flex',
        alignItems: 'center',
        borderBottom: `1px solid ${colors.light}`
    },
    image: {
        width: '10%',
        padding: 10,
        '& img': {
            width: '100%'
        }
    },
    product: {
        width: '25%'
    },
    name: {
        fontSize: 12
    },
    qty: {
        width: '27%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    subtotal: {
        width: '25%',
        textAlign: 'right',
        paddingRight: 10
    },
    delete: {
        width: '8%',
        '& .MuiSvgIcon-root': {
            fontSize: 16,
            color: colors.grey
        }
    }
}

class CartItem extends PureComponent {
    render() {
        const { classes, _id, image, name, price, qty, changeQty, deleteItem } = this.props
        return (
            <Box className={classes.root}>
                <Box className={classes.delete}>
                    <IconButton onClick={() => deleteItem(_id)}>
                        <DeleteOutlineIcon/>
                    </IconButton>
                </Box>
                <Box className={classes.image}>
                    <img src={image} alt="cart"/>
                </Box>
                <Box className={classes.product}>
                    <Typography variant="caption">{ name }</Typography>
                    <Typography variant="body2">${ price }</Typography>
                </Box>
                <Box className={classes.qty}>
                    <IconButton color="primary" onClick={() => changeQty(_id, qty-1)}>
                        <RemoveCircleOutlineIcon/>
                    </IconButton>
                    <Typography variant="caption">{ qty }</Typography>
                    <IconButton color="primary" onClick={() => changeQty(_id, qty+1)}>
                        <AddCircleOutlineIcon/>
                    </IconButton>
                </Box>
                <Box className={classes.subtotal}>
                    <Typography variant="subtitle2">${ qty*price }</Typography>
                </Box>
            </Box>
        );
    }
}

export default withStyles(styles)(CartItem)