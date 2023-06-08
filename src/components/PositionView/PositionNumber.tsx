import Typography from '@mui/material/Typography';

interface PositionNumberProps {
    children?: number;
}

const PositionNumber: React.FC<PositionNumberProps> = ({ children }) => {
    return (
        <Typography
            sx={{
                fontWeight: 700,
                textAlign: 'center',
            }}
            variant="caption"
        >
            {children}
        </Typography>
    );
};

export default PositionNumber;
