import { LinkProps } from '@mui/material/Link';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import LinkBehavior from 'components/LinkBehavior';

const theme = createTheme({
    breakpoints: {
        values: {
            xs: 0,
            sm: 320,
            md: 961,
            lg: 1200,
            xl: 1536,
        },
    },
    // https://mui.com/material-ui/guides/routing/#global-theme-link
    components: {
        MuiLink: {
            defaultProps: {
                component: LinkBehavior,
            } as LinkProps,
        },
        MuiButtonBase: {
            defaultProps: {
                LinkComponent: LinkBehavior,
            },
        },
    },
});

const responsiveTypographyTheme = responsiveFontSizes(theme);

export default responsiveTypographyTheme;
