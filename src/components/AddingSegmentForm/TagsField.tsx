import { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import LightenChip from 'components/LightenChip';
import isEmpty from 'helpers/isEmpty';
import useFixedOptions, { Normalizer, Mapper } from 'hooks/useFixedOptions';

import { useParentFieldRoles } from 'components/AddingSegmentForm/ParentSegmentField';

const normalizer: Normalizer<string> = (tag, fixedTagsMap) => {
    return !fixedTagsMap.get(tag);
};
const mapper: Mapper<string> = (tag) => [tag, true];

const TagsField: React.FC<FieldRenderProps<string[]>> = ({ input, meta }) => {
    const [inputValue, setInputValue] = useState('');
    const { value, name, onBlur, onChange, onFocus } = input;
    const parentSegment = useParentFieldRoles();
    const [fixedOptions, handleChange] = useFixedOptions(parentSegment?.tags || null, mapper, normalizer, onChange);

    const inputHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setInputValue(newValue);
    };

    const handleAdd = () => {
        if (!value.includes(inputValue)) {
            onChange([...value, inputValue]);
        }
        setInputValue('');
    };

    return (
        <Autocomplete
            value={value}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
            inputValue={inputValue}
            onInputChange={inputHandleChange}
            options={[]}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    label="Теги"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                <InputAdornment position="end">
                                    {!isEmpty(inputValue) && (
                                        <IconButton onClick={handleAdd} size="small" sx={{ p: 0.25 }}>
                                            <AddIcon sx={{ width: 22, height: 22 }} />
                                        </IconButton>
                                    )}
                                </InputAdornment>
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    margin="normal"
                />
            )}
            renderTags={(value: readonly string[], getTagProps) =>
                value.map((option: string, index: number) => (
                    <LightenChip
                        label={option}
                        color="secondary"
                        {...getTagProps({ index })}
                        disabled={meta.submitting || fixedOptions?.get(option)}
                    />
                ))
            }
            disabled={meta.submitting}
            clearText=""
            freeSolo
            multiple
            clearOnBlur
        />
    );
};

export default TagsField;
