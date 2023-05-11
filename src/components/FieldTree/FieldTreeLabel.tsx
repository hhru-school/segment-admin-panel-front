import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import AnswerTypeChip from 'components/AnswerTypeChip';
import Card from 'components/Card';
import LightenChip from 'components/LightenChip';
import QuestionTypeChip from 'components/QuestionTypeChip';
import isEmpty from 'helpers/isEmpty';
import useTreeItemContext from 'hooks/useTreeItemContext';
import { Answer, Question, isQuestion } from 'models/fields';

interface FieldTreeLabelProps {
    node: Question | Answer;
}

const ExpandButton = styled('button')(({ theme }) => ({
    position: 'absolute',
    bottom: '6px',
    right: '4px',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: '4px',
    color: theme.palette.text.secondary,
    ...theme.typography.caption,
    lineHeight: 1,
    outline: 0,
    border: 0,
    cursor: 'pointer',
    appearance: 'none',
    backgroundColor: 'transparent',
    transition: theme.transitions.create('color'),
    '&:hover': {
        color: theme.palette.primary.main,
    },
}));

const FieldTreeLabel: React.FC<FieldTreeLabelProps> = ({ node }) => {
    const { expand, toggleExpand } = useTreeItemContext();
    if (isQuestion(node)) {
        return (
            <Card caption="Вопрос" color="primary">
                <Typography variant="h6" sx={{ mb: 1 }}>
                    {node.title}
                </Typography>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{node.description}</Typography>
                <Stack direction="row" spacing={1} sx={{ pt: 2, pb: 1 }}>
                    <QuestionTypeChip type={node.type} size="small" />
                </Stack>
                {!isEmpty(node.answerDtoList) && (
                    <ExpandButton onClick={toggleExpand}>{expand ? 'Свернуть' : 'Развернуть'}</ExpandButton>
                )}
            </Card>
        );
    }
    return (
        <Card caption="Ответ">
            <Typography variant="h6" sx={{ mb: 1 }}>
                {node.title}
            </Typography>
            <Typography component="span" sx={{ mb: 1 }}>
                Утверждение: {node.positiveTitle}
            </Typography>
            <Stack direction="row" spacing={1} sx={{ pt: 2, pb: 1 }}>
                <AnswerTypeChip type={node.answerType} size="small" />
                {node.answerDefault && <LightenChip label="По умолчанию" color="info" size="small" />}
                {node.skipAtResult && <LightenChip label="Скрыть вопрос если выбран" color="info" size="small" />}
            </Stack>
            {!isEmpty(node.openQuestonDtoList) && (
                <ExpandButton onClick={toggleExpand}>{expand ? 'Свернуть' : 'Развернуть'}</ExpandButton>
            )}
        </Card>
    );
};

export default FieldTreeLabel;
