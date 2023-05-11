import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';

import Tree from 'components/Tree';
import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectFieldsList, selectFieldsSearchString } from 'models/fields';

import FieldsTreeItem from 'components/FieldsTree/FieldsTreeItem';

const FieldsTree: React.FC = () => {
    const fields = useAppSelector(selectFieldsList, shallowEqual);
    const searchString = useAppSelector(selectFieldsSearchString);

    if (isEmpty(fields)) {
        if (isEmpty(searchString)) {
            return (
                <Tree>
                    <li>
                        <Alert severity="info">Нет ни одного поля.</Alert>
                    </li>
                </Tree>
            );
        }
        return (
            <Tree>
                <li>
                    <Alert severity="info">Не найдено ни одного поля. Попробуйте другой запрос.</Alert>
                </li>
            </Tree>
        );
    }

    return (
        <Tree>
            {fields.map((field) => (
                <FieldsTreeItem key={field.id} field={field} searchString={searchString} />
            ))}
        </Tree>
    );
};

export default FieldsTree;
