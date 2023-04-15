import React from 'react';
import { Link as RouterLink, LinkProps as RouterLinkProps } from 'react-router-dom';

type LinkBehaviorProps = Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] };

// https://mui.com/material-ui/guides/routing/#global-theme-link
const LinkBehavior = React.forwardRef<HTMLAnchorElement, LinkBehaviorProps>((props, ref) => {
    const { href, ...other } = props;
    // Map href (MUI) -> to (react-router)
    return <RouterLink ref={ref} to={href} {...other} />;
});

export default LinkBehavior;
export type { LinkBehaviorProps };
