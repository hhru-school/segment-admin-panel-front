import { styled, alpha } from '@mui/material/styles';

interface QuestionStatusWrapperProps {
    changed?: boolean;
}

const QuestionStatusWrapper = styled('nav', {
    shouldForwardProp: (prop) => prop !== 'changed',
})<QuestionStatusWrapperProps>(({ theme, changed }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
    padding: '9px',
    borderRadius: '50%',
    verticalAlign: 'middle',
    ...(changed && { backgroundColor: alpha(theme.palette.info.light, 0.04) }),
}));

export default QuestionStatusWrapper;
