import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import ExpandButton from 'components/Tree/ExpandButton';

const enum Padding {
    Normal = 'normal',
    Fitted = 'fitted',
}

export interface TreeItemLabelProps {
    children?: React.ReactNode;
    actionButton?: React.ReactNode;
    padding?: `${Padding}`;
    collapsible?: boolean;
    expand?: boolean;
    toggleExpand: () => void;
}

const paddings = new Map<TreeItemLabelProps['padding'], string>([
    [Padding.Normal, '9px 16px'],
    [Padding.Fitted, '9px 16px 9px 43px'],
]);

const TreeItemLabel: React.FC<TreeItemLabelProps> = ({
    children,
    padding = Padding.Normal,
    actionButton,
    collapsible,
    expand,
    toggleExpand,
}) => {
    return (
        <Stack
            direction="row"
            alignItems="center"
            sx={{ minHeight: 55, p: paddings.get(padding), borderBottom: 1, borderColor: 'divider' }}
        >
            {collapsible && <ExpandButton expand={expand} onClick={toggleExpand} />}
            <Box sx={{ flexGrow: 1, mx: 1 }}>{children}</Box>
            <Box>{actionButton}</Box>
        </Stack>
    );
};

export default TreeItemLabel;
