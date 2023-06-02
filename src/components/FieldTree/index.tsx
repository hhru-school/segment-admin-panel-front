import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

import TreeItem from 'components/Tree/TreeItem';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentField } from 'models/currentField';
import { Answer, Question, isQuestion } from 'types/field';

import FieldTreeLabel from 'components/FieldTree/FieldTreeLabel';

const render = (node: Question | Answer): JSX.Element => {
    const nextNodeList = isQuestion(node) ? node.possibleAnswersList : node.openQuestionList;

    return (
        <TreeItem
            key={node.id}
            renderLabel={(expand, toggleExpand) => (
                <FieldTreeLabel node={node} expand={expand} toggleExpand={toggleExpand} />
            )}
            expanded
            margin="16px"
        >
            {nextNodeList.map(render)}
        </TreeItem>
    );
};

const FieldTree: React.FC = () => {
    const field = useAppSelector(selectCurrentField);

    if (field === null) {
        return (
            <Alert severity="warning">
                Нет данных! Проверьте подключение к интернету и повторите попытку или обратитесь к администратору.
            </Alert>
        );
    }

    return <List>{render(field)}</List>;
};

export default FieldTree;
