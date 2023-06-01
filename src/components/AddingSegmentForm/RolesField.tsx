import { FieldRenderProps, useField } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import LightenChip from 'components/LightenChip';
import extractFinalFormErrorState from 'helpers/extractFinalFormErrorState';
import { useAppSelector } from 'hooks/redux-hooks';
import useFixedOptions, { Normalizer, Mapper } from 'hooks/useFixedOptions';
import { selectRoles, selectRolesLoadingStatus } from 'models/roles';
import { Role, RolesList } from 'types/role';
import { Segment } from 'types/segment';

import { FieldName } from 'components/AddingSegmentForm';

const normalizer: Normalizer<Role> = (role, fixedRolesMap) => {
    return !fixedRolesMap.get(role.id);
};
const mapper: Mapper<Role> = (role) => [role.id, true];

const RolesField: React.FC<FieldRenderProps<RolesList>> = ({ input, meta }) => {
    const isLoading = useAppSelector(selectRolesLoadingStatus);
    const roles = useAppSelector(selectRoles, shallowEqual);
    const { value, name, onBlur, onChange, onFocus } = input;
    const [isError, errorMessage] = extractFinalFormErrorState(meta);
    const parentFieldProps = useField<Segment | null>(FieldName.ParentSegment, {
        subscription: { value: true },
        allowNull: true,
    });
    const parentSegment = parentFieldProps.input.value;
    const [fixedOptions, handleChange] = useFixedOptions(parentSegment?.roles || null, mapper, normalizer, onChange);

    return (
        <Autocomplete
            value={value}
            onBlur={onBlur}
            onChange={handleChange}
            onFocus={onFocus}
            options={roles}
            getOptionLabel={(option) => option.name}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            renderInput={(params) => (
                <TextField
                    {...params}
                    name={name}
                    label="Роли *"
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
                    helperText={isError && errorMessage}
                    margin="normal"
                />
            )}
            renderTags={(roles: RolesList, getTagProps) =>
                roles.map(({ id, name }, index) => (
                    <LightenChip
                        label={name}
                        color="primary"
                        {...getTagProps({ index })}
                        disabled={meta.submitting || fixedOptions?.get(id)}
                    />
                ))
            }
            loading={isLoading}
            disabled={meta.submitting}
            clearText=""
            openText=""
            multiple
            autoComplete
            autoHighlight
            clearOnBlur
        />
    );
};

export default RolesField;
