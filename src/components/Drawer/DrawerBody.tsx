import List from '@mui/material/List';

interface DrawerBodyProps {
    children: React.ReactNode;
}

const DrawerBody: React.FC<DrawerBodyProps> = ({ children }) => {
    return <List sx={{ py: 2 }}>{children}</List>;
};

export default DrawerBody;
