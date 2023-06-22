import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface AccordionItemProps {
    title: string;
    description?: React.ReactNode;
    children?: React.ReactNode;
}

const AccordionItem: React.FC<AccordionItemProps> = ({ title, description, children }) => {
    return (
        <>
            <Accordion
                elevation={0}
                sx={{ '&:before': { display: 'none' } }}
                TransitionProps={{ unmountOnExit: true }}
                disableGutters
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ width: 32, height: 32 }} />}
                    sx={{ minHeight: 65, '&:hover': { backgroundColor: 'action.hover' } }}
                >
                    <Typography variant="subtitle1" sx={{ fontWeight: 500 }}>
                        {title}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack spacing={4} alignItems="center">
                        {description}
                        {children}
                    </Stack>
                </AccordionDetails>
            </Accordion>
            <Divider />
        </>
    );
};

export default AccordionItem;
