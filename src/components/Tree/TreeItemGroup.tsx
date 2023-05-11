import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

import useTreeItemContext from 'hooks/useTreeItemContext';

interface TreeItemGroupProps {
    children?: React.ReactNode;
}
const StyledList = styled(List)({
    marginTop: '8px',
    marginLeft: '32px',
    padding: 0,
});

const TreeItemGroup: React.FC<TreeItemGroupProps> = ({ children }) => {
    const { expand } = useTreeItemContext();
    return (
        <Collapse in={expand}>
            <StyledList>{children}</StyledList>
        </Collapse>
    );
};

export default TreeItemGroup;
