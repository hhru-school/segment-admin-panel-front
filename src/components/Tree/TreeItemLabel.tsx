import CreatedIcon from '@mui/icons-material/AddCircleOutline';
import ArchiveIcon from '@mui/icons-material/RemoveCircleOutline';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { lightGreen, red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

import ExpandButton from 'components/Tree/ExpandButton';

const enum Variant {
    UNSTYLED = 'unstyled',
    DEFAULT = 'default',
    CREATED = 'created',
    ARCHIVE = 'archive',
}

export interface TreeItemLabelProps {
    children?: React.ReactNode;
    actionButton?: React.ReactNode;
    variant?: `${Variant}`;
    collapsible?: boolean;
    showEndIcon?: boolean;
    expand?: boolean;
    toggleExpand: () => void;
}

const ContentBox = styled(Stack, {
    shouldForwardProp: (prop) => prop !== 'collapsible' && prop !== 'variant',
})<Pick<TreeItemLabelProps, 'collapsible' | 'variant'>>(({ theme, collapsible, variant }) => ({
    ...(variant === Variant.DEFAULT && {
        padding: collapsible ? '9px 16px 9px 4px' : '9px 16px',
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
    }),
    ...(variant === Variant.CREATED && {
        padding: collapsible ? '9px 8px 9px 4px' : '9px 8px 9px 16px',
        color: lightGreen[900],
        backgroundColor: alpha(lightGreen.A400, 0.1),
        borderRadius: theme.shape.borderRadius,
    }),
    ...(variant === Variant.ARCHIVE && {
        padding: collapsible ? '9px 8px 9px 4px' : '9px 8px 9px 16px',
        color: red[900],
        backgroundColor: alpha(red.A400, 0.1),
        borderRadius: theme.shape.borderRadius,
    }),
}));

const icons = new Map<TreeItemLabelProps['variant'], JSX.Element>([
    [Variant.CREATED, <CreatedIcon sx={{ height: 20, width: 20 }} />],
    [Variant.ARCHIVE, <ArchiveIcon sx={{ height: 20, width: 20 }} />],
]);

const TreeItemLabel: React.FC<TreeItemLabelProps> = ({
    children,
    actionButton,
    variant = Variant.DEFAULT,
    showEndIcon,
    collapsible,
    expand,
    toggleExpand,
}) => {
    const notDefault = variant !== Variant.DEFAULT;
    return (
        <ContentBox direction="row" gap={1} alignItems="center" variant={variant} collapsible={collapsible}>
            {collapsible && (
                <ExpandButton expand={expand} onClick={toggleExpand} {...(notDefault && { color: 'inherit' })} />
            )}
            <Typography sx={{ flexGrow: 1 }}>{children}</Typography>
            <Box>{actionButton}</Box>
            {notDefault && (
                <Box sx={{ width: '30px', height: '30px', padding: '5px' }}>{showEndIcon && icons.get(variant)}</Box>
            )}
        </ContentBox>
    );
};

export default TreeItemLabel;
