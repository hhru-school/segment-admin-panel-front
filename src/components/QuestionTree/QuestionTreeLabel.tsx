import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface QuestionTreeLabelProps {
    title: string;
    text: string;
    icon?: React.ReactNode;
}

const QuestionTreeLabel: React.FC<QuestionTreeLabelProps> = ({ title, text, icon }) => {
    return (
        <Stack direction="row" alignItems="flex-start" gap={1}>
            <Typography component="div" fontWeight={500}>
                {title}
            </Typography>
            <Typography component="div" sx={{ flexGrow: 1 }}>
                {text}
            </Typography>
            {icon && <Box sx={{ lineHeight: 0, pl: 2 }}>{icon}</Box>}
        </Stack>
    );
};

export default QuestionTreeLabel;
