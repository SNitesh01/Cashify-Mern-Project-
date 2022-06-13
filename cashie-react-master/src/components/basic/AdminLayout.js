import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames  from "classnames";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Drawer from "@material-ui/core/Drawer";
import AccountCircleTwoTone from "@material-ui/icons/AccountCircleTwoTone";
import MenuIcon from '@material-ui/icons/Menu';
import colors from "../../constants/colors";
import Box from "@material-ui/core/Box";

import Logo from "../../assets/logo.png";
import FullLogo from "../../assets/logo-full.png";
import Menus from "./Menus";
import {Switch} from "react-router-dom";
import "../../assets/style.css"
import {PrivateComponent} from "../routes/PrivateRoute";
import Slide from "@material-ui/core/Slide";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const drawerWidth = 200

const styles = theme => ({
    root: {
        width: '100%',
        display: 'flex'
    },
    menuButton: {
        color: colors.darkPurple
    },
    profile: {
        marginLeft: 'auto'
    },
    appBar: {
        width: '100%',
        background: colors.white,
        boxShadow: '0px 10px 41px -18px rgba(207,207,207,0.3)',
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
        backgroundColor: colors.darkPurple,
        alignItems: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
    },
    fullLogo: {
        width: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        '& img': {
            width: '70%'
        },
    },
    logo: {
        width: 100,
        marginTop: 50
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: -drawerWidth,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginLeft: 0,
    },
    menuPaper: {
        width: 150,
        top: '64px !important'
    },
})

class AdminLayout extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            menu: false,
            drawer: false
        }
    }

    handleMenu = () => {
        this.setState({
            menu: !this.state.menu
        })
    }

    handleDrawer() {
        this.setState({
            drawer: !this.state.drawer
        })
    }

    signOut = () => {
        localStorage.removeItem('token')
        setTimeout(() => {
            window.location.href = '/login'
        }, 2000)
    }

    render() {
        const { classes, history } = this.props
        const { drawer, menu } = this.state

        return (
            <div className={classes.root}>
                <AppBar className={classNames(
                    classes.appBar,
                    drawer && classes.appBarShift
                )} elevation={0}>
                    <Toolbar>
                        <Box className={classes.fullLogo}>
                            { !drawer && (
                                <Slide in={true} direction="right">
                                    <img src={FullLogo} alt="full-logo"/>
                                </Slide>
                            )}
                        </Box>
                        <IconButton
                            edge="start"
                            className={classes.menuButton}
                            aria-label="menu"
                            onClick={() => this.handleDrawer()}>
                            <MenuIcon />
                        </IconButton>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={this.handleMenu}
                            className={classes.profile}
                        >
                            <AccountCircleTwoTone/>
                        </IconButton>
                        <Menu
                            classes={{ paper: classes.menuPaper}}
                            anchorEl={null}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={menu}
                            onClose={this.handleMenu}
                        >
                            <MenuItem onClick={this.handleMenu}>Profile</MenuItem>
                            <MenuItem onClick={this.handleMenu}>My account</MenuItem>
                            <MenuItem onClick={this.signOut}>Sign out</MenuItem>
                        </Menu>
                    </Toolbar>
                </AppBar>

                <Drawer
                    className={classes.drawer}
                    variant="persistent"
                    anchor="left"
                    open={drawer}
                    classes={{
                        paper: classes.drawerPaper,
                    }}
                >
                    <Box>
                        <img src={Logo} className={classes.logo} alt="logo"/>
                    </Box>
                    <Menus history={history}/>
                </Drawer>

                <main className={classNames(
                    classes.content,
                    drawer && classes.contentShift
                )}>
                    <div className={classes.drawerHeader} />
                    <Switch>
                        {PrivateComponent}
                    </Switch>
                </main>
            </div>
        );
    }
}

export default withStyles(styles)(AdminLayout)