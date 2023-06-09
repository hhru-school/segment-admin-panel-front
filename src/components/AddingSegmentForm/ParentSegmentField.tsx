import { FieldRenderProps } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectSegmentsLoadingStatus, selectSegments } from 'models/segments';
import { Segment } from 'types/segment';

const ParentSegmentField: React.FC<FieldRenderProps<Segment | null>> = ({ input, meta }) => {
    const isLoading = useAppSelector(selectSegmentsLoadingStatus);
    const segments = useAppSelector(selectSegments, shallowEqual);
    const { value, name, onBlur, onChange, onFocus } = input;

    const handleChange = (event: React.SyntheticEvent, newValue: Segment | null) => {
        onChange(newValue);
    };

    return (
        <Autocomplete
            value={value}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
            options={segments}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    label="Родительский сегмент"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    margin="normal"
                />
            )}
            loading={isLoading}
            disabled={meta.submitting}
            clearText=""
            openText=""
            autoComplete
            autoHighlight
            clearOnBlur
        />
    );
};

export default ParentSegmentField;
