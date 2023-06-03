import Collapse from '@mui/material/Collapse';
import List from '@mui/material/List';
import { styled } from '@mui/material/styles';

interface TreeItemGroupProps {
    children?: React.ReactNode;
    margin?: string;
    expand?: boolean;
}
const StyledList = styled(List, { shouldForwardProp: (prop) => prop !== 'margin' })<Pick<TreeItemGroupProps, 'margin'>>(
    ({ margin }) => ({
        marginTop: margin,
        marginLeft: '48px',
        padding: 0,
    })
);

const TreeItemGroup: React.FC<TreeItemGroupProps> = ({ children, margin, expand = false }) => {
    return (
        <Collapse in={expand}>
            <StyledList margin={margin}>{children}</StyledList>
        </Collapse>
    );
};

export default TreeItemGroup;
