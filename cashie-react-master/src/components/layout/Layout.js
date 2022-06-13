import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Drawer from "@material-ui/core/Drawer";
import { Switch } from "react-router-dom";
import colors from "../../constants/colors";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleTwoTone from "@material-ui/icons/AccountCircleTwoTone";
import AppBar from "@material-ui/core/AppBar";
import Logo from "../../assets/logo.png";
import {PrivateComponent} from "../routes/PrivateRoute";
import Menus from "./Menus";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 90
const styles = theme => ({
    root: {
        display: 'flex'
    },
    appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        background: colors.white,
    },
    appBarMenu: {
        width: 100,
        top: '56px !important'
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        textAlign: 'center',
        background: colors.darkPurple,
        border: 'none',
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    profile: {
        marginLeft: 'auto'
    },
    logo: {
        width: 60,
        marginTop: 30,
        marginBottom: 10
    },
    menu: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center'
    },
    menuItem: {
        width: 65,
        height: 55,
        background: colors.darkPurple,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        cursor: 'pointer',
    },
    menuIcon: {
        color: colors.white
    },
    menuLabel: {
        fontSize: 11,
        color: colors.white
    },
    content: {
        width: `calc(100% - ${drawerWidth}px)`,
        display: 'flex',
        flexDirection: 'column',
        padding: 40,
    }
})

class Layout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            openMenu: false,
            anchorEl: null
        }
    }

    handleMenu = (e) => {
        this.setState({
            anchorEl: e.currentTarget,
            openMenu: !this.state.openMenu
        })
    }

    openPage = (path) => {
        this.props.history.push(path)
        this.setState({
            anchorEl: null,
            openMenu: !this.state.openMenu
        })
    }

    logout = () => {
        localStorage.removeItem('user')
        setTimeout(() => {
            window.location.href = '/login'
        }, 500)
    }

    render() {
        const { openMenu, anchorEl } = this.state
        const { classes, history } = this.props
        return (
            <div className={classes.root}>
                <AppBar
                    elevation={0}
                    position="fixed"
                    className={classes.appBar}
                >
                    <Toolbar>
                        <IconButton
                            edge="end"
                            className={classes.profile}
                            onClick={this.handleMenu}
                        >
                            <AccountCircleTwoTone/>
                        </IconButton>
                    </Toolbar>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={openMenu}
                        onClose={this.handleMenu}
                        classes={{ paper: classes.appBarMenu }}
                    >
                        <MenuItem onClick={() => this.openPage('/admin/setting')}>Setting</MenuItem>
                        <MenuItem onClick={() => this.openPage('/admin/account')}>Account</MenuItem>
                        <MenuItem onClick={this.logout}>Logout</MenuItem>
                    </Menu>
                </AppBar>
                <Drawer
                    variant="permanent"
                    open={true}
                    className={classes.drawer}
                    classes={{
                        paper: classes.drawerPaper
                    }}
                >
                    <Box>
                        <img src={Logo} className={classes.logo} alt="logo"/>
                    </Box>
                    <div className={classes.menu}>
                        <Menus history={history}/>
                    </div>
                </Drawer>
                <main className={classes.content}>
                    <div className={classes.drawerHeader}/>
                    <Switch>
                        {PrivateComponent}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(Layout)
