import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface DataCardSubtitleProps {
    children?: React.ReactNode;
}

const DataCardSubtitle: React.FC<DataCardSubtitleProps> = ({ children }) => {
    return (
        <Box sx={{ pb: 2 }}>
            <Typography component="h3" variant="h5">
                {children}
            </Typography>
        </Box>
    );
};

export default DataCardSubtitle;
