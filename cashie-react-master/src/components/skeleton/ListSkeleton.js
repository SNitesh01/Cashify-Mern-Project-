import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Skeleton from '@material-ui/lab/Skeleton';

const styles = {
    skeleton: {
        width: '100%',
        height: 70,
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10
    }
}

class ListSkeleton extends React.Component {
    render() {
        const { classes } = this.props
        return (
            <div>
                {[1,2,3,4,5,6,7].map((i) => {
                    return (
                        <Skeleton
                            key={i}
                            variant="rect"
                            className={classes.skeleton} />
                    )
                })}
            </div>
        );
    }
}

export default withStyles(styles)(ListSkeleton)