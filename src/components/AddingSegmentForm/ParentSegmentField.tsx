import { FieldRenderProps } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import isMessage from 'helpers/isMessage';
import { useAppSelector } from 'hooks/redux-hooks';
import { Segment, selectSegmentsLoadingStatus, selectSegments } from 'models/segments';

const ParentSegmentField: React.FC<FieldRenderProps<Segment | null>> = ({ input: { name, onChange }, meta }) => {
    const isLoading = useAppSelector(selectSegmentsLoadingStatus);
    const segments = useAppSelector(selectSegments, shallowEqual);

    const handleChange = (event: React.SyntheticEvent, newValue: Segment | null) => {
        onChange(newValue);
    };

    return (
        <Autocomplete
            onChange={handleChange}
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
                    error={isMessage(meta.error) && meta.touched}
                    helperText={isMessage(meta.error) && meta.touched && meta.error}
                    margin="normal"
                />
            )}
            ListboxProps={{ sx: { maxHeight: 196 } }}
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
