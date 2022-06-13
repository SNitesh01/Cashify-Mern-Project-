import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import colors from "../../constants/colors";
import Paper from "@material-ui/core/Paper";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const styles = {
    root: {
        position: 'relative',
        cursor: 'pointer'
    },
    card: {
        height: 160,
        padding: 10,
        textAlign: 'center',
        borderRadius: 0
    },
    imageBox: {
        width: '100%',
        height: 100,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,

        '& img': {
            maxWidth: '100%',
            maxHeight: '100%',
        }
    },
    name: {
        fontSize: 14,
        fontWeight: 700,
        color: colors.dark
    },
    price: {
        fontWeight: 700,
        fontSize: 16,
        color: colors.fanta
    },
    overlay: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        background: colors.black,
        opacity: 0.5
    },
    check: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        display: 'flex'
    },
    iconCheck: {
        fontSize: 46,
        color: colors.white
    }
}

class ProductItem extends React.Component {
    render() {
        const { classes, image, selected, name, price, onClick } = this.props
        return (
            <div className={classes.root} onClick={onClick}>
                <Paper variant="outlined" className={classes.card}>
                    <Box className={classes.imageBox}>
                        <img src={image} alt="product"/>
                    </Box>
                    <Typography className={classes.name}>{ name }</Typography>
                    <Typography className={classes.price}>${ price }</Typography>
                </Paper>
                { selected && (
                    <>
                        <Box className={classes.overlay}/>
                        <Box className={classes.check}>
                            <CheckCircleIcon className={classes.iconCheck} fontSize="large"/>
                        </Box>
                    </>
                )}
            </div>
        );
    }
}

export default withStyles(styles)(ProductItem)