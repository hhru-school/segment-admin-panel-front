import { useState } from 'react';
import { shallowEqual } from 'react-redux';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { ScreenFieldInputValues } from 'components/AddingLayerForm/types';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectFieldsList, selectFieldsLoadingStatus } from 'models/fields';
import { Question, QuestionList } from 'types/field';

interface AddFieldInputProps {
    currentFields?: ScreenFieldInputValues;
    addField?: (value: Question) => void;
    disabled?: boolean;
}

const getOptions = (fields: QuestionList, currentFields: ScreenFieldInputValues): QuestionList => {
    return fields.filter(({ id }) => !currentFields[`id-${id}`]);
};

const AddFieldInput: React.FC<AddFieldInputProps> = ({ currentFields, addField, disabled }) => {
    const isLoading = useAppSelector(selectFieldsLoadingStatus);
    const fields = useAppSelector(selectFieldsList, shallowEqual);
    const [value, setValue] = useState<Question | null>(null);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: Question | null) => {
        setValue(newValue);
    };

    const handleOnBlur = () => {
        setValue(null);
    };

    const handleAddField = () => {
        if (value !== null && addField) {
            addField(value);
            setValue(null);
        }
    };

    const handleKeyEnter: React.KeyboardEventHandler = (event) => {
        if (event.key === 'Enter') {
            handleAddField();
        }
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            onBlur={handleOnBlur}
            onKeyDown={handleKeyEnter}
            options={currentFields ? getOptions(fields, currentFields) : fields}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    placeholder="Начните вводить название поля"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                <InputAdornment position="end">
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                    {value && (
                                        <IconButton onClick={handleAddField} size="small" sx={{ p: 0.25 }}>
                                            <AddIcon sx={{ width: 22, height: 22 }} />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    margin="none"
                />
            )}
            forcePopupIcon={false}
            loading={isLoading}
            disabled={disabled}
            fullWidth
            clearText=""
            autoComplete
            autoHighlight
            clearOnBlur
        />
    );
};

export default AddFieldInput;
