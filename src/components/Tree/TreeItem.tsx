import React from 'react';
import { styled } from '@mui/material/styles';

import TreeItemProvider from 'components/Tree/TreeItemContext';
import TreeItemGroup from 'components/Tree/TreeItemGroup';

export interface TreeItemProps {
    label?: React.ReactNode;
    children?: React.ReactNode;
    expanded?: boolean;
}

const StyledLi = styled('li')({
    '&:not(:last-child)': {
        marginBottom: '8px',
    },
});

const TreeItem: React.FC<TreeItemProps> = ({ label, children, expanded }) => {
    const hasChildren = React.Children.count(children) > 0;

    return (
        <TreeItemProvider expanded={expanded}>
            <StyledLi>
                {label}
                {hasChildren && <TreeItemGroup>{children}</TreeItemGroup>}
            </StyledLi>
        </TreeItemProvider>
    );
};

export default TreeItem;
