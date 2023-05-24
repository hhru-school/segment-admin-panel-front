import { LinkProps } from '@mui/material/Link';
import { ruRU } from '@mui/material/locale';
import { createTheme, responsiveFontSizes } from '@mui/material/styles';

import LinkBehavior from 'components/LinkBehavior';

const theme = createTheme(
    {
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
    },
    ruRU
);

const responsiveTypographyTheme = responsiveFontSizes(theme);

export default responsiveTypographyTheme;
