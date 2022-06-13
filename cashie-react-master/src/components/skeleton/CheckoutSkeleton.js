import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Skeleton from '@material-ui/lab/Skeleton';
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";

const styles = {
    tabs: {
        width: '100%',
        height: 40,
        borderRadius: 5
    },
    product: {
        width: '100%',
        height: 100,
        borderRadius: 5
    },
    skeleton: {
        width: '100%',
        height: 50,
        marginBottom: 10,
        borderRadius: 5
    }
}

class CheckoutSkeleton extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <Box>
                <Grid container spacing={3}>
                    <Grid item sm={7}>
                        <Grid container spacing={2}>
                            {[1,2,3].map((i) => {
                                return (
                                    <Grid item sm={4} key={i}>
                                        <Skeleton variant="rect" className={classes.tabs}/>
                                    </Grid>
                                )
                            })}
                        </Grid>
                        {[1,2,3,4].map((i) => {
                            return (
                                <Grid key={i} container spacing={2}>
                                    {[1,2,3].map((i) => {
                                        return (
                                            <Grid item sm={4} key={i}>
                                                <Skeleton variant="rect" className={classes.product}/>
                                            </Grid>
                                        )
                                    })}
                                </Grid>
                            )
                        })}
                    </Grid>
                    <Grid item sm={5}>
                        {[1,2,3,4,5,6,7,8].map((i) => {
                            return (
                                <Skeleton
                                    key={i}
                                    variant="rect"
                                    className={classes.skeleton} />
                            )
                        })}
                    </Grid>
                </Grid>
            </Box>
        );
    }
}

export default withStyles(styles)(CheckoutSkeleton)