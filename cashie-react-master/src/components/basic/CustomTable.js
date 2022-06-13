import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import colors from "../../constants/colors";

const styles = {
    table: {
        borderSpacing: '0 15px',
        borderCollapse: 'separate',
        '& tr': {
            '& th': {
                paddingTop: 5,
                paddingBottom: 0,
                color: colors.grey
            },
            '& td': {
                height: 45,
                background: colors.white,
                padding: '10px 15px'
            },
            '& td:first-child': {
                borderTopLeftRadius: 20,
                borderBottomLeftRadius: 20,
            },
            '& td:last-child': {
                borderTopRightRadius: 20,
                borderBottomRightRadius: 20
            }
        }
    }
}

class CustomTable extends React.Component {
    render() {
        const { classes, children } = this.props
        return (
            <Table className={classes.table}>
                { children }
            </Table>
        );
    }
}

export default withStyles(styles)(CustomTable)