import { createMuiTheme } from "@material-ui/core/styles";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: '#C24C89',
            dark: '#b8407e'
        },
        secondary: {
            main: '#EA5179',
            dark: '#d4466b'
        },
    },
    overrides: {
        MuiToolbar: {
            root: {
                boxShadow: '0px 10px 24px 0px rgba(207,207,207,0.15)',
            }
        },
        MuiCard: {
            root: {
                boxShadow: '0px 10px 24px 0px rgba(207,207,207,0.4)',
                borderRadius: 15,
                padding: 25
            }
        },
        MuiButton: {
            root: {
                fontWeight: 400,
                textTransform: 'none',
            },
            outlined: {
                borderRadius: 25
            },
            contained: {
                padding: 10,
                paddingLeft: 25,
                paddingRight: 25,
                borderRadius: 25,
                boxShadow: '0 4px 6px rgba(50,50,93,.11), 0 1px 3px rgba(0,0,0,.08)'
            },
            containedSizeSmall: {
                padding: '5px 15px'
            }
        },
        MuiTableCell: {
            root: {
                borderBottom: 'none',
            }
        },
        MuiDialogActions: {
            root: {
                paddingTop: 15,
                padding: 24
            }
        }
    }
})

export default theme