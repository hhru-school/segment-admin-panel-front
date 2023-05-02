import Typography from '@mui/material/Typography';

interface TitleProps {
    children: React.ReactNode;
}

const Title: React.FC<TitleProps> = ({ children }) => {
    return (
        <Typography component="h2" variant="h4" sx={{ py: 3 }}>
            {children}
        </Typography>
    );
};

export default Title;
