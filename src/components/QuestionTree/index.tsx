import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import TreeView from '@mui/lab/TreeView';
import { styled } from '@mui/material/styles';

import { Answer, Question, QuestionList, isQuestion } from 'models/layerChanges';

import QuestionTreeLabel from 'components/QuestionTree/QuestionTreeLabel';
import QuestionTreeNode from 'components/QuestionTree/QuestionTreeNode';

const enum Variant {
    CREATED = 'created',
    ARCHIVE = 'archive',
    DEFAULT = 'default',
}

export interface QuestionTreeProps {
    items: QuestionList;
    variant?: `${Variant}`;
}

type Node = Question | Answer;

const StyledTreeView = styled(TreeView, { shouldForwardProp: (prop) => prop !== 'variant' })<
    Pick<QuestionTreeProps, 'variant'>
>(({ theme }) => ({
    borderRadius: theme.spacing(0.5),
}));

const renderTree = (
    node?: Node | null,
    variant: QuestionTreeProps['variant'] = Variant.DEFAULT,
    key = '',
    isRoot = true
): React.ReactNode => {
    if (node === null || node === undefined) {
        return null;
    }

    const uniqueKey = key === '' ? node.id.toString() : `${key}-${node.id}`;

    if (isQuestion(node)) {
        if (isRoot) {
            return (
                <QuestionTreeNode
                    key={uniqueKey}
                    nodeId={uniqueKey}
                    variant={variant}
                    label={
                        <QuestionTreeLabel
                            title="Вопрос:"
                            text={node.title}
                            icon={
                                (variant === Variant.CREATED && <AddCircleOutlineIcon />) ||
                                (variant === Variant.ARCHIVE && <RemoveCircleOutlineIcon />)
                            }
                        />
                    }
                >
                    {node.answerList.map((child) => renderTree(child, variant, uniqueKey, false))}
                </QuestionTreeNode>
            );
        }
        return (
            <QuestionTreeNode
                key={uniqueKey}
                nodeId={uniqueKey}
                variant={variant}
                label={<QuestionTreeLabel title="Вопрос:" text={node.title} />}
            >
                {node.answerList.map((child) => renderTree(child, variant, uniqueKey, false))}
            </QuestionTreeNode>
        );
    }

    return (
        <QuestionTreeNode
            key={uniqueKey}
            nodeId={uniqueKey}
            variant={variant}
            label={<QuestionTreeLabel title="Ответ:" text={node.title} />}
        >
            {node.openQuestionList.map((child) => renderTree(child, variant, uniqueKey, false))}
        </QuestionTreeNode>
    );
};

const QuestionTree: React.FC<QuestionTreeProps> = ({ items, variant }) => {
    return (
        <StyledTreeView
            defaultCollapseIcon={<ExpandMoreIcon sx={{ width: 24, height: 24 }} />}
            defaultExpandIcon={<ChevronRightIcon sx={{ width: 24, height: 24 }} />}
            variant={variant}
            disableSelection
        >
            {items.map((item) => renderTree(item, variant))}
        </StyledTreeView>
    );
};

export default QuestionTree;
