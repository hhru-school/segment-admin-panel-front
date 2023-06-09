import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import AnswerTypeChip from 'components/AnswerTypeChip';
import AnswersTypeChip from 'components/AnswersTypeChip';
import Card from 'components/Card';
import LightenChip from 'components/LightenChip';
import isEmpty from 'helpers/isEmpty';
import { Answer, Question, isQuestion, FieldTypes } from 'types/field';

interface FieldTreeLabelProps {
    node: Question | Answer;
    expand?: boolean;
    toggleExpand: () => void;
}

const ExpandButton = styled('button')(({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 0,
    padding: 0,
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

const FieldTreeLabel: React.FC<FieldTreeLabelProps> = ({ node, expand, toggleExpand }) => {
    if (isQuestion(node)) {
        return (
            <Card caption="Вопрос" color="primary">
                <Typography variant="h6" sx={{ mb: 1 }}>
                    {node.title}
                </Typography>
                <Typography sx={{ mb: 1, color: 'text.secondary' }}>{node.description}</Typography>
                <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ pt: 2, pb: 1 }}>
                    <Stack direction="row" spacing={1} flexGrow={1}>
                        <AnswersTypeChip type={node.answersType} size="small" />
                        {node.type === FieldTypes.ResumeField && (
                            <LightenChip label="Стандартное поле" color="info" size="small" />
                        )}
                    </Stack>
                    {!isEmpty(node.possibleAnswersList) && (
                        <ExpandButton onClick={toggleExpand}>{expand ? 'Свернуть' : 'Развернуть'}</ExpandButton>
                    )}
                </Stack>
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
            <Stack direction="row" spacing={2} alignItems="flex-end" sx={{ pt: 2, pb: 1 }}>
                <Stack direction="row" spacing={1} flexGrow={1}>
                    <AnswerTypeChip type={node.answerType} size="small" />
                    {node.defaultAnswer && <LightenChip label="По умолчанию" color="info" size="small" />}
                    {node.skipAtResult && <LightenChip label="Скрыть вопрос если выбран" color="info" size="small" />}
                </Stack>
                {!isEmpty(node.openQuestionList) && (
                    <ExpandButton onClick={toggleExpand}>{expand ? 'Свернуть' : 'Развернуть'}</ExpandButton>
                )}
            </Stack>
        </Card>
    );
};

export default FieldTreeLabel;
