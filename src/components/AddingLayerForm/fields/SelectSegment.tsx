import { useMemo } from 'react';
import { shallowEqual } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

import { SegmentInputValues } from 'components/AddingLayerForm/types';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectSegments, selectSegmentsLoadingStatus } from 'models/segments';
import { Segment, SegmentsList } from 'types/segment';

interface SelectSegmentProps {
    value: Segment | null;
    currentSegments?: SegmentInputValues | null;
    onChange?: (newValue: Segment | null) => void;
    disabled?: boolean;
}

const getOptions = (segments: SegmentsList, currentSegments?: SegmentInputValues | null): SegmentsList => {
    if (!currentSegments) {
        return segments;
    }
    return segments.filter(({ id }) => !currentSegments[`id-${id}`]);
};

const SelectSegment: React.FC<SelectSegmentProps> = ({ value, currentSegments, onChange, disabled }) => {
    const isLoading = useAppSelector(selectSegmentsLoadingStatus);
    const segments = useAppSelector(selectSegments, shallowEqual);
    const options = useMemo(() => getOptions(segments, currentSegments), [segments, currentSegments]);

    const handleChange = (event: React.SyntheticEvent<Element, Event>, newValue: Segment | null) => {
        if (onChange) {
            onChange(newValue);
        }
    };

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
            options={options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            getOptionLabel={(option) => option.title}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Сегмент"
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <>
                                <InputAdornment position="end">
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                </InputAdornment>
                                {params.InputProps.endAdornment}
                            </>
                        ),
                    }}
                    margin="normal"
                />
            )}
            loading={isLoading}
            disabled={disabled}
            fullWidth
            clearText=""
            autoComplete
            autoHighlight
        />
    );
};

export default SelectSegment;
