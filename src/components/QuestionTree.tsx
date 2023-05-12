import List from '@mui/material/List';

import isEmpty from 'helpers/isEmpty';
import { Answer, Question, QuestionList, isQuestion } from 'models/layerChanges';

import TreeItem from 'components/Tree/TreeItem';
import TreeItemLabel, { TreeItemLabelProps } from 'components/Tree/TreeItemLabel';

export interface QuestionTreeProps extends Pick<TreeItemLabelProps, 'variant'> {
    items: QuestionList;
    showLink?: boolean;
}

type Node = Question | Answer;

interface RenderTreeOptions {
    key?: string;
    variant?: QuestionTreeProps['variant'];
    showLink?: boolean;
    isRoot?: boolean;
}

const renderTree = (node?: Node | null, { key, variant, isRoot = false }: RenderTreeOptions = {}): React.ReactNode => {
    if (!node) {
        return null;
    }

    const uniqueKey = key === undefined ? node.id.toString() : `${key}-${node.id}`;
    const nodeIsQuestion = isQuestion(node);
    const nextNodeList = nodeIsQuestion ? node.answerList : node.openQuestionList;

    return (
        <TreeItem
            key={uniqueKey}
            renderLabel={(expand, toggleExpand) => (
                <TreeItemLabel
                    variant={variant}
                    showEndIcon={nodeIsQuestion && isRoot}
                    collapsible={!isEmpty(nextNodeList)}
                    expand={expand}
                    toggleExpand={toggleExpand}
                >
                    {node.title}
                </TreeItemLabel>
            )}
        >
            {nextNodeList.map((item) => renderTree(item, { key: uniqueKey, variant }))}
        </TreeItem>
    );
};

const QuestionTree: React.FC<QuestionTreeProps> = ({ items, variant, showLink }) => {
    return <List>{items.map((item) => renderTree(item, { variant, showLink, isRoot: true }))}</List>;
};

export default QuestionTree;
