import List from '@mui/material/List';

interface TreeProps {
    children?: React.ReactNode;
}

const Tree: React.FC<TreeProps> = ({ children }) => {
    return <List>{children}</List>;
};

export default Tree;
