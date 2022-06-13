import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MoreIcon from "../assets/more.svg";
import IconButton from "@material-ui/core/IconButton";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import VisibilityIcon from '@material-ui/icons/Visibility';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import colors from "../constants/colors";

const styles = {
    menu: {
        opacity: 0.5
    },
    icon: {
        marginRight: 10,
        color: colors.grey
    }
}

class ListMenu extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            open: false,
            anchorEl: null,
            confirmOpen: false
        }
    }

    handleOpenMenu = (e) => {
        this.setState({
            open: true,
            anchorEl: e.currentTarget
        })
    }

    handleCloseMenu = () => {
        this.setState({
            open: false,
            anchorEl: null
        })
    }

    handleOpenConfirm = () => {
        this.setState({
            open: false,
            anchorEl: null,
            confirmOpen: true
        })
    }

    handleCloseConfirm = () => {
        this.setState({
            confirmOpen: false
        })
    }

    handleDeleteData = () => {
        const { item, handleDelete } = this.props
        handleDelete(item._id)
        this.handleCloseConfirm()
    }

    handleDetailOpen = () => {
        const { item, handleDetail } = this.props
        handleDetail(item)
        this.setState({
            open: false,
            anchorEl: null,
        })
    }

    handleEditOpen = () => {
        const { item, handleEdit } = this.props
        handleEdit(item._id)
    }

    render() {
        const { anchorEl, open, confirmOpen } = this.state
        const { classes, handleDetail, handleEdit, handleDelete } = this.props

        return (
            <div>
                <IconButton onClick={this.handleOpenMenu}>
                    <img src={MoreIcon}
                         className={classes.menu}
                         width={20}
                        alt="menu-icon"
                    />
                </IconButton>
                <Menu
                    classes={{ paper: classes.menuPaper}}
                    anchorEl={anchorEl}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    keepMounted
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    open={open}
                    onClose={this.handleCloseMenu}
                >
                    { handleDetail && <MenuItem onClick={this.handleDetailOpen}>
                        <VisibilityIcon className={classes.icon} fontSize="small"/>Detail</MenuItem> }
                    { handleEdit && <MenuItem onClick={this.handleEditOpen}>
                        <EditIcon className={classes.icon} fontSize="small"/>Edit</MenuItem> }
                    { handleDelete && <MenuItem onClick={this.handleOpenConfirm}>
                        <DeleteIcon className={classes.icon} fontSize="small"/>Delete</MenuItem> }
                </Menu>

                <Dialog
                    open={confirmOpen}
                    onClose={this.handleCloseConfirm}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Are you sure want to delete data?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseConfirm} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={this.handleDeleteData} color="primary" autoFocus>
                            Delete
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default withStyles(styles)(ListMenu)