import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

interface DataCardProps {
    margin?: boolean;
    children?: React.ReactNode;
    title?: string;
}

const DataCard: React.FC<DataCardProps> = ({ title, children, margin }) => {
    return (
        <Paper sx={{ px: { sm: 2, md: 3 }, mb: margin ? 3 : 0 }}>
            <Box sx={{ py: 3 }}>
                <Typography component="h2" variant="h4">
                    {title}
                </Typography>
            </Box>
            {children}
        </Paper>
    );
};

export default DataCard;
