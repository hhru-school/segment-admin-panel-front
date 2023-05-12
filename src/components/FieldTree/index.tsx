import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

import TreeItem from 'components/Tree/TreeItem';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentField } from 'models/currentField';
import { Answer, Question, isQuestion } from 'models/fields';

import FieldTreeLabel from 'components/FieldTree/FieldTreeLabel';

const render = (node: Question | Answer): JSX.Element => {
    const nextNodeList = isQuestion(node) ? node.answerDtoList : node.openQuestonDtoList;

    return (
        <TreeItem
            key={node.id}
            renderLabel={(expand, toggleExpand) => (
                <FieldTreeLabel node={node} expand={expand} toggleExpand={toggleExpand} />
            )}
            expanded
        >
            {nextNodeList.map(render)}
        </TreeItem>
    );
};

const FieldTree: React.FC = () => {
    const field = useAppSelector(selectCurrentField);

    if (field === null) {
        return (
            <List>
                <li>
                    <Alert severity="info">Нет данных.</Alert>
                </li>
            </List>
        );
    }

    return <List>{render(field)}</List>;
};

export default FieldTree;
