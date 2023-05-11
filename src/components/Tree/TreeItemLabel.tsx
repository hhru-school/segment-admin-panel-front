import CreatedIcon from '@mui/icons-material/AddCircleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ArchiveIcon from '@mui/icons-material/RemoveCircleOutline';
import IconButton from '@mui/material/IconButton';
import { lightGreen, red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

import useTreeItemContext from 'hooks/useTreeItemContext';

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
}

const ContentBox = styled('div', {
    shouldForwardProp: (prop) => prop !== 'collapsible' && prop !== 'variant',
})<Pick<TreeItemLabelProps, 'collapsible' | 'variant'>>(({ theme, collapsible, variant }) => ({
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
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

const ExpandingButtonSlot = styled('div')({
    width: '30px',
    height: '30px',
    alignSelf: 'flex-start',
    marginRight: '8px',
});

const ActionButtonSlot = styled('div')({
    alignSelf: 'flex-start',
    marginLeft: '8px',
});

const EndIconSlot = styled('div')({
    width: '30px',
    height: '30px',
    padding: '5px',
    alignSelf: 'flex-start',
    marginLeft: '8px',
});

const MainSlot = styled('div')(({ theme }) => ({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    ...theme.typography.body1,
}));

const icons = new Map<TreeItemLabelProps['variant'], JSX.Element>([
    [Variant.CREATED, <CreatedIcon sx={{ height: 20, width: 20 }} />],
    [Variant.ARCHIVE, <ArchiveIcon sx={{ height: 20, width: 20 }} />],
]);

const TreeItemLabel: React.FC<TreeItemLabelProps> = ({
    children,
    actionButton,
    variant = Variant.DEFAULT,
    collapsible,
    showEndIcon,
}) => {
    const { expand, toggleExpand } = useTreeItemContext();
    const notDefault = variant !== Variant.DEFAULT;
    return (
        <ContentBox variant={variant} collapsible={collapsible}>
            {collapsible && (
                <ExpandingButtonSlot>
                    <IconButton onClick={toggleExpand} size="small" {...(notDefault && { color: 'inherit' })}>
                        {expand ? <ExpandMoreIcon fontSize="small" /> : <ChevronRightIcon fontSize="small" />}
                    </IconButton>
                </ExpandingButtonSlot>
            )}
            <MainSlot>{children}</MainSlot>
            {actionButton && <ActionButtonSlot>{actionButton}</ActionButtonSlot>}
            {notDefault && <EndIconSlot>{showEndIcon && icons.get(variant)}</EndIconSlot>}
        </ContentBox>
    );
};

export default TreeItemLabel;
