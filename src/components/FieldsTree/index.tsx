import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

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
                <List>
                    <li>
                        <Alert severity="info">Нет ни одного поля.</Alert>
                    </li>
                </List>
            );
        }
        return (
            <List>
                <li>
                    <Alert severity="info">Не найдено ни одного поля. Попробуйте другой запрос.</Alert>
                </li>
            </List>
        );
    }

    return (
        <List>
            {fields.map((field) => (
                <FieldsTreeItem key={field.id} field={field} searchString={searchString} />
            ))}
        </List>
    );
};

export default FieldsTree;
