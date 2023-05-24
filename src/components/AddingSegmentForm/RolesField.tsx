import { useEffect, useMemo } from 'react';
import { FieldRenderProps, useField } from 'react-final-form';
import { shallowEqual } from 'react-redux';
import Autocomplete from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';

import LightenChip from 'components/LightenChip';
import isMessage from 'helpers/isMessage';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectRoles, selectRolesLoadingStatus, RolesList } from 'models/roles';
import { Segment } from 'models/segments';

import { FieldName } from 'components/AddingSegmentForm';

const RolesField: React.FC<FieldRenderProps<RolesList>> = ({ input: { name, value, onChange }, meta }) => {
    const isLoading = useAppSelector(selectRolesLoadingStatus);
    const roles = useAppSelector(selectRoles, shallowEqual);
    const parentFieldProps = useField<Segment | null>(FieldName.ParentSegment, {
        subscription: { value: true },
        allowNull: true,
    });
    const parentSegment = parentFieldProps.input.value;
    const fixedOptions = useMemo(() => {
        return parentSegment ? new Map(parentSegment.roles.map((role) => [role.id, true])) : null;
    }, [parentSegment]);

    const handleChange = (event: React.SyntheticEvent, newValue: RolesList) => {
        if (parentSegment && fixedOptions) {
            const normalizeValue = parentSegment.roles.concat(
                newValue.filter((option) => !fixedOptions.get(option.id))
            );
            onChange(normalizeValue);
        } else {
            onChange(newValue);
        }
    };

    useEffect(() => {
        onChange(parentSegment ? parentSegment.roles : []);
    }, [parentSegment, onChange]);

    return (
        <Autocomplete
            value={value}
            onChange={handleChange}
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
                    error={isMessage(meta.error) && meta.touched}
                    helperText={isMessage(meta.error) && meta.touched && meta.error}
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
            ListboxProps={{ sx: { maxHeight: 196 } }}
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
