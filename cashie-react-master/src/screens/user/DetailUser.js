import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import CustomDialog from "../../components/custom/CustomDialog";
import colors from "../../constants/colors";

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
    }
}

class DetailUser extends React.Component {
    render() {
        const { open, onClose, user, classes } = this.props
        return (
            <CustomDialog
                open={open}
                onClose={onClose}
                title={`${ user.fullname }'s Detail User`}>
                <Table className={classes.table}>
                    <TableBody>
                        <TableRow>
                            <TableCell component="th">Full Name</TableCell>
                            <TableCell>{ user.fullname }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Username</TableCell>
                            <TableCell>{ user.username }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Email Address</TableCell>
                            <TableCell>{ user.email }</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell component="th">Role</TableCell>
                            <TableCell>{ user.role }</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </CustomDialog>
        );
    }
}

export default withStyles(styles)(DetailUser)