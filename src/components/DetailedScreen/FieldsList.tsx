import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';

import ChangeStatusChip from 'components/ChangeStatusChip';
import FieldVisibilityView from 'components/FieldVisibilityView';
import PositionView from 'components/PositionView';
import indexToPosition from 'helpers/indexToPosition';
import { ChangeStates } from 'types/common';
import { ScreenFieldList } from 'types/field';

interface FieldsListProps {
    list: ScreenFieldList;
    disabled?: boolean;
}

const FieldsList: React.FC<FieldsListProps> = ({ list, disabled }) => {
    return (
        <List>
            {list.map((field, index) => (
                <ListItem key={field.id} sx={{ gap: 2 }}>
                    <PositionView
                        position={indexToPosition(index)}
                        previousPosition={field.oldPosition}
                        disabled={disabled}
                    />
                    <Typography sx={{ flexGrow: 1, hyphens: 'auto', mr: 2 }}>{field.title}</Typography>
                    {field.isNew && (
                        <ChangeStatusChip label="Новое" type={ChangeStates.New} variant="outlined" size="small" />
                    )}
                    <FieldVisibilityView state={field.visibility} previousState={field.oldVisibility} />
                </ListItem>
            ))}
        </List>
    );
};

export default FieldsList;
