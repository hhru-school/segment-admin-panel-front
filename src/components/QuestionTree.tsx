import isEmpty from 'helpers/isEmpty';
import { Answer, Question, QuestionList, isQuestion } from 'models/layerChanges';

import Tree from 'components/Tree';
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
            label={
                <TreeItemLabel
                    variant={variant}
                    collapsible={!isEmpty(nextNodeList)}
                    showEndIcon={nodeIsQuestion && isRoot}
                >
                    {node.title}
                </TreeItemLabel>
            }
        >
            {nextNodeList.map((item) => renderTree(item, { key: uniqueKey, variant }))}
        </TreeItem>
    );
};

const QuestionTree: React.FC<QuestionTreeProps> = ({ items, variant, showLink }) => {
    return <Tree>{items.map((item) => renderTree(item, { variant, showLink, isRoot: true }))}</Tree>;
};

export default QuestionTree;
