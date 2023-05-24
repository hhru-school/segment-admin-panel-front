import { useEffect, useState } from 'react';
import { FieldRenderProps, useField } from 'react-final-form';
import AddIcon from '@mui/icons-material/Add';
import Autocomplete from '@mui/material/Autocomplete';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import LightenChip from 'components/LightenChip';
import isEmpty from 'helpers/isEmpty';
import { Segment } from 'models/segments';

import { FieldName } from 'components/AddingSegmentForm';

const TagsField: React.FC<FieldRenderProps<string[]>> = ({ input: { name, value, onChange }, meta }) => {
    const [inputValue, setInputValue] = useState('');
    const parentFieldProps = useField<Segment | null>(FieldName.ParentSegment, {
        subscription: { value: true },
        allowNull: true,
    });
    const parentSegment = parentFieldProps.input.value;

    const handleChange = (event: React.SyntheticEvent, newValue: string[]) => {
        if (parentSegment) {
            const normalizeValue = parentSegment.tags.concat(
                newValue.filter((option) => !parentSegment.tags.includes(option))
            );
            onChange(normalizeValue);
        } else {
            onChange(newValue);
        }
    };

    const inputHandleChange = (event: React.SyntheticEvent, newValue: string) => {
        setInputValue(newValue);
    };

    const handleAdd = () => {
        if (!value.includes(inputValue)) {
            onChange([...value, inputValue]);
        }
        setInputValue('');
    };

    useEffect(() => {
        onChange(parentSegment ? parentSegment.tags : []);
    }, [parentSegment, onChange]);

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
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
                        disabled={meta.submitting || parentSegment?.tags.includes(option)}
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
