import { FieldRenderProps, useForm } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import DataTable from 'components/DataTable';
import { columns } from 'components/ParentsLayersTable';
import extractFinalFormErrorState from 'helpers/extractFinalFormErrorState';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectLayersList, selectLayersListLoadingStatus } from 'models/layersList';
import { LayersList, LayersListItem } from 'types/layer';

const getParentLayers = (value: LayersListItem | null, layers: LayersList): LayersList => {
    if (value === null) {
        return [];
    }
    const currentLayerIndex = layers.findIndex(({ id }) => id === value.id);
    return layers.slice(currentLayerIndex);
};

const ParentLayerInput: React.FC<FieldRenderProps<LayersListItem | null>> = ({ input, meta }) => {
    const { value, name, onBlur, onChange, onFocus } = input;
    const [isError, errorMessage] = extractFinalFormErrorState(meta);
    const form = useForm();
    const isLoading = useAppSelector(selectLayersListLoadingStatus);
    const layers = useAppSelector(selectLayersList, shallowEqual);
    const parentLayers = getParentLayers(value, layers);

    const handleChange = (event: React.SyntheticEvent, newValue: LayersListItem | null) => {
        onChange(newValue);
        form.mutators.resetSegments();
    };

    return (
        <>
            <Autocomplete
                value={value}
                onBlur={onBlur}
                onChange={handleChange}
                onFocus={onFocus}
                options={layers}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.title}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        name={name}
                        label="Родительский слой *"
                        InputProps={{
                            ...params.InputProps,
                            endAdornment: (
                                <>
                                    {isLoading ? <CircularProgress color="primary" size={20} /> : null}
                                    {params.InputProps.endAdornment}
                                </>
                            ),
                        }}
                        error={isError}
                        margin="normal"
                        helperText={isError && errorMessage}
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
            <Box sx={{ display: 'inline-block', mt: 2, mb: 1 }}>
                <DataTable<LayersListItem>
                    columns={columns}
                    rows={parentLayers}
                    emptyMessage={'Родительский слой не выбран.'}
                    maxDisplayRows={5}
                />
            </Box>
        </>
    );
};

export default ParentLayerInput;
