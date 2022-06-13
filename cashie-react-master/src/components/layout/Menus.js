import React from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import classNames  from "classnames"
import colors from "../../constants/colors";
import Box from "@material-ui/core/Box";
import { routes } from "../routes/PrivateRoute"
import Typography from "@material-ui/core/Typography";
import ROLE from "../../constants/role";

const styles = theme => ({
    hide: {
        display: 'none !important'
    },
    menuItem: {
        width: 70,
        height: 55,
        background: colors.darkPurple,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 10,
        marginTop: 10,
        cursor: 'pointer',
        transition: 'all ease-in-out 0.25s',
    },
    menuIcon: {
        color: colors.white
    },
    menuLabel: {
        fontSize: 11,
        color: colors.white
    },
    menuActive: {
        background: colors.pink,

    }
})

class Menus extends React.Component {
    navigateScreen(path) {
        const { history } = this.props
        history.push({ pathname: path })
    }

    renderMenu() {
        const { classes, history } = this.props
        const active = history.location.pathname
        const currentUser = JSON.parse(localStorage.getItem('user'))

        return routes.map(({name, icon: Component, path, role, child, children}, i) => {
            let hide = role !== undefined && currentUser.user.role !== ROLE.Admin
            let menuActive = false
            if (children) {
                if (active === path) {
                    menuActive = true
                } else {
                    children.forEach(path => {
                        if (active.indexOf(path) !== -1) {
                            menuActive = true
                        }
                    })
                }
            } else {
                if (active === path) {
                    menuActive = true
                }
            }
            if (!child) {
                return (
                    <Box
                        key={i}
                        hidden={child}
                        onClick={() => this.navigateScreen(path)}
                        className={classNames(
                            classes.menuItem,
                            menuActive && classes.menuActive,
                            hide && classes.hide
                        )}>
                        <Component className={classes.menuIcon}/>
                        <Typography className={classes.menuLabel}>{ name }</Typography>
                    </Box>
                )
            }

            return <div key={i}/>
        })
    }

    render() {
        return this.renderMenu()
    }
}

export default withStyles(styles)(Menus)