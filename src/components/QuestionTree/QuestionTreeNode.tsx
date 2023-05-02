import TreeItem from '@mui/lab/TreeItem';
import { lightGreen, red } from '@mui/material/colors';
import { styled, alpha } from '@mui/material/styles';

import { QuestionTreeProps } from 'components/QuestionTree';

const QuestionTreeNode = styled(TreeItem, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<QuestionTreeProps, 'variant'>
>(({ theme, variant }) => ({
    '&:not(:last-child)': {
        marginBottom: theme.spacing(1),
    },
    '& .MuiTreeItem-content': {
        marginBottom: theme.spacing(1),
        paddingTop: theme.spacing(1.5),
        paddingBottom: theme.spacing(1.5),
        paddingRight: theme.spacing(2),
        borderRadius: theme.spacing(0.5),
        alignItems: 'flex-start',
        ...(variant === 'created' && {
            color: lightGreen[900],
            backgroundColor: alpha(lightGreen.A400, 0.1),
            '&:hover': {
                backgroundColor: alpha(lightGreen.A400, 0.2),
            },
            '&.Mui-focused': {
                backgroundColor: alpha(lightGreen.A400, 0.3),
            },
        }),
        ...(variant === 'archive' && {
            color: red[900],
            backgroundColor: alpha(red.A400, 0.1),
            '&:hover': {
                backgroundColor: alpha(red.A400, 0.2),
            },
            '&.Mui-focused': {
                backgroundColor: alpha(red.A400, 0.3),
            },
        }),
    },
    '& .MuiTreeItem-label': {
        paddingLeft: theme.spacing(1),
    },
}));

export default QuestionTreeNode;
