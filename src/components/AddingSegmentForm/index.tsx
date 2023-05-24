import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';

import { isApiError } from 'api';
import isEmpty from 'helpers/isEmpty';
import isMessage from 'helpers/isMessage';
import sleep from 'helpers/sleep';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { RolesList, fetchRoles, reset as resetRoles, selectRolesLoadingStatus } from 'models/roles';
import { Segment, fetchSegments, reset as resetSegments, selectSegmentsLoadingStatus } from 'models/segments';

import ParentSegmentField from 'components/AddingSegmentForm/ParentSegmentField';
import RolesField from 'components/AddingSegmentForm/RolesField';
import TagsField from 'components/AddingSegmentForm/TagsField';

export const enum FieldName {
    Title = 'title',
    Description = 'description',
    ParentSegment = 'parentSegment',
    Roles = 'roles',
    Tags = 'tags',
}
interface Values {
    [FieldName.Title]: string;
    [FieldName.Description]: string;
    [FieldName.ParentSegment]: Segment | null;
    [FieldName.Roles]: RolesList;
    [FieldName.Tags]: string[];
}
type Errors = Partial<Record<keyof Values, string>>;
interface RequestBody {
    title: string;
    description: string;
    parentSegmentId: number | null;
    rolesId: number[];
    tags: string[];
}

const validator = (values: Values): Errors => {
    const errors: Errors = {};
    if (!values.title) {
        errors.title = 'Пожалуйста, введите наименование сегмента.';
    }
    if (!values.roles || isEmpty(values.roles)) {
        errors.roles = 'Пожалуйста, выберите роль для сегмента.';
    }
    return errors;
};

const convertToRequestBody = ({ title, description, parentSegment, roles, tags }: Values): RequestBody => ({
    title,
    description,
    parentSegmentId: parentSegment ? parentSegment.id : null,
    rolesId: roles.map(({ id }) => id),
    tags,
});

const AddingSegmentForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const rolesIsLoading = useAppSelector(selectRolesLoadingStatus);
    const segmentsIsLoading = useAppSelector(selectSegmentsLoadingStatus);
    const { setAlert } = useErrorAlert();

    const handleCancel = () => {
        navigate(-1);
    };

    const onSubmit = async (values: Values) => {
        await sleep(2000);
        // eslint-disable-next-line no-console
        console.log(convertToRequestBody(values));
        navigate(-1);
    };

    useEffect(() => {
        Promise.all([dispatch(fetchSegments()).unwrap(), dispatch(fetchRoles()).unwrap()]).catch((error) => {
            if (isApiError(error)) {
                setAlert(error.message);
            }
        });
        return () => {
            dispatch(resetSegments());
            dispatch(resetRoles());
        };
    }, [dispatch, setAlert]);

    return (
        <Form<Values>
            onSubmit={onSubmit}
            initialValues={{ title: '', parentSegment: null, description: '', roles: [], tags: [] }}
            validate={validator}
            subscription={{ submitting: true, pristine: true, submitSucceeded: true }}
            render={({ handleSubmit, submitting, submitSucceeded }) => (
                <form id="adding-segment-from" autoComplete="off" onSubmit={handleSubmit}>
                    <Field<string> name={FieldName.Title}>
                        {({ input, meta }) => (
                            <TextField
                                label="Наименование *"
                                value={input.value}
                                onBlur={input.onBlur}
                                onChange={input.onChange}
                                error={isMessage(meta.error) && meta.touched}
                                helperText={isMessage(meta.error) && meta.touched && meta.error}
                                margin="normal"
                                disabled={submitting}
                                fullWidth
                            />
                        )}
                    </Field>
                    <Field<string> name={FieldName.Description}>
                        {({ input, meta }) => (
                            <TextField
                                label="Описание"
                                value={input.value}
                                onChange={input.onChange}
                                error={isMessage(meta.error)}
                                helperText={isMessage(meta.error) && meta.touched && meta.error}
                                margin="normal"
                                multiline
                                rows={3}
                                disabled={submitting}
                                fullWidth
                            />
                        )}
                    </Field>
                    <Field<Segment | null> name={FieldName.ParentSegment} allowNull>
                        {(props) => <ParentSegmentField {...props} />}
                    </Field>
                    <Field<RolesList> name={FieldName.Roles}>{(props) => <RolesField {...props} />}</Field>
                    <Field<string[]> name={FieldName.Tags}>{(props) => <TagsField {...props} />}</Field>
                    <Stack direction="row" spacing={1} justifyContent="flex-end" sx={{ mt: 2, color: 'action.active' }}>
                        <Button
                            onClick={handleCancel}
                            variant="outlined"
                            color="inherit"
                            sx={{ width: 112 }}
                            disabled={submitting || submitSucceeded}
                        >
                            Отмена
                        </Button>
                        <LoadingButton
                            form="adding-segment-from"
                            type="submit"
                            variant="contained"
                            sx={{ width: 112 }}
                            disableElevation
                            disabled={rolesIsLoading || segmentsIsLoading || submitSucceeded}
                            loading={submitting}
                        >
                            Добавить
                        </LoadingButton>
                    </Stack>
                </form>
            )}
        />
    );
};

export default AddingSegmentForm;
