import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';

import TreeItemGroup from 'components/Tree/TreeItemGroup';

export interface RenderLabel {
    (expand: boolean, toggleExpand: () => void): JSX.Element;
}

export interface TreeItemProps {
    renderLabel: RenderLabel;
    children?: React.ReactNode;
    expanded?: boolean;
}

const StyledLi = styled('li')({
    '&:not(:last-child)': {
        marginBottom: '8px',
    },
});

const TreeItem: React.FC<TreeItemProps> = ({ renderLabel, children, expanded = false }) => {
    const hasChildren = React.Children.count(children) > 0;
    const [expand, setExpand] = useState(expanded);

    const handleToggleExpand = useCallback(() => {
        setExpand(!expand);
    }, [expand, setExpand]);

    return (
        <StyledLi>
            {renderLabel(expand, handleToggleExpand)}
            {hasChildren && <TreeItemGroup expand={expand}>{children}</TreeItemGroup>}
        </StyledLi>
    );
};

export default TreeItem;
