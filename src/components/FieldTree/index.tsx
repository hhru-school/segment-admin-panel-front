import Alert from '@mui/material/Alert';

import Tree from 'components/Tree';
import TreeItem from 'components/Tree/TreeItem';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentField } from 'models/currentField';
import { Answer, Question, isQuestion } from 'models/fields';

import FieldTreeLabel from 'components/FieldTree/FieldTreeLabel';

const render = (node: Question | Answer): JSX.Element => {
    const nextNodeList = isQuestion(node) ? node.answerDtoList : node.openQuestonDtoList;

    return (
        <TreeItem key={node.id} label={<FieldTreeLabel node={node} />} expanded>
            {nextNodeList.map(render)}
        </TreeItem>
    );
};

const FieldTree: React.FC = () => {
    const field = useAppSelector(selectCurrentField);

    if (field === null) {
        return (
            <Tree>
                <li>
                    <Alert severity="info">Нет данных.</Alert>
                </li>
            </Tree>
        );
    }

    return <Tree>{render(field)}</Tree>;
};

export default FieldTree;
