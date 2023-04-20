import Box from '@mui/material/Box';

interface DataCardContentProps {
    children?: React.ReactNode;
}

const DataCardContent: React.FC<DataCardContentProps> = ({ children }) => {
    return <Box sx={{ pb: 3 }}>{children}</Box>;
};

export default DataCardContent;
