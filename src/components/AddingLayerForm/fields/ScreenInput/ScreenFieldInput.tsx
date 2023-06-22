import { Field, useForm } from 'react-final-form';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import Typography from '@mui/material/Typography';
import { getIn } from 'final-form';

import FieldVisibilityInput from 'components/AddingLayerForm/fields/FieldVisibilityInput';
import getScreenName from 'components/AddingLayerForm/helpers/getScreenName';
import getSegmentName from 'components/AddingLayerForm/helpers/getSegmentName';
import { ScreenFieldInputValue } from 'components/AddingLayerForm/types';
import ChangeStatusChip from 'components/ChangeStatusChip';
import { ChangeStates } from 'types/common';
import { FieldVisibilityState } from 'types/field';

interface ScreenFieldInputProps {
    name: string;
    field: ScreenFieldInputValue;
    disabled?: boolean;
    dynamic?: boolean;
}

const ScreenFieldInput: React.FC<ScreenFieldInputProps> = ({ name, field, disabled, dynamic }) => {
    const form = useForm();
    const { id, title, oldVisibility, isNew } = field;

    const segmentName = getSegmentName(name);
    const screenName = getScreenName(name);
    const isNewInSegment = getIn(form.getState().values, `${segmentName}.fields.id-${id}.isNew`) as boolean | undefined;
    const isCanBeRemoved = dynamic && isNew;

    const handleDeleteField = () => {
        form.mutators.removeFieldFromScreen(name, id);
        form.mutators.calcNewScreenFieldsPosition(`${screenName}.fields`);
        form.mutators.updateSegmentFields(segmentName);
    };

    return (
        <ListItem sx={{ pl: 3 }}>
            <Typography sx={{ flexGrow: 1, hyphens: 'auto', mr: 2 }}>{title}</Typography>
            {isNewInSegment && (
                <ChangeStatusChip
                    label="Новое"
                    type={ChangeStates.New}
                    variant="outlined"
                    size="small"
                    disabled={disabled}
                    sx={{ mr: 2 }}
                />
            )}
            <Field<FieldVisibilityState> name={`${name}.visibility`}>
                {(props) => <FieldVisibilityInput {...props} previousValue={oldVisibility} disabled={disabled} />}
            </Field>
            {isCanBeRemoved ? (
                <IconButton onClick={handleDeleteField} size="small" edge="end" disabled={disabled}>
                    <ClearIcon fontSize="small" />
                </IconButton>
            ) : (
                <Box sx={{ width: 27 }} />
            )}
        </ListItem>
    );
};

export default ScreenFieldInput;
