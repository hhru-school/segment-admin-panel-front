import React, { useCallback, useState } from 'react';
import { styled } from '@mui/material/styles';

import TreeItemGroup from 'components/Tree/TreeItemGroup';

export interface RenderLabel {
    (expand: boolean, toggleExpand: () => void): JSX.Element;
}

export interface TreeItemProps {
    renderLabel: RenderLabel;
    children?: React.ReactNode;
    margin?: string;
    expanded?: boolean;
}

const StyledLi = styled('li', { shouldForwardProp: (prop) => prop !== 'margin' })<Pick<TreeItemProps, 'margin'>>(
    ({ margin }) => ({
        '&:not(:last-child)': {
            marginBottom: margin,
        },
    })
);

const TreeItem: React.FC<TreeItemProps> = ({ renderLabel, children, expanded = false, margin }) => {
    const hasChildren = React.Children.count(children) > 0;
    const [expand, setExpand] = useState(expanded);

    const handleToggleExpand = useCallback(() => {
        setExpand(!expand);
    }, [expand, setExpand]);

    return (
        <StyledLi margin={margin}>
            {renderLabel(expand, handleToggleExpand)}
            {hasChildren && (
                <TreeItemGroup expand={expand} margin={margin}>
                    {children}
                </TreeItemGroup>
            )}
        </StyledLi>
    );
};

export default TreeItem;
