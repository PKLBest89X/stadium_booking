import { colors, createMuiTheme } from '@material-ui/core';


const theme = createMuiTheme({
    palette: {
        background: {
            dark: '#f4f6f8',
            default: colors.common.white,
            paper: colors.common.white,
        },
        primary: {
            main: colors.indigo[500]
        },
        text: {
            primary: colors.blueGrey[900],
            secondary: colors.blueGrey[600]
        }
    },
});

export default theme;