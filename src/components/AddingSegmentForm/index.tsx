import { useEffect } from 'react';
import { Form, Field } from 'react-final-form';
import { useNavigate } from 'react-router-dom';
import LoadingButton from '@mui/lab/LoadingButton';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FORM_ERROR, SubmissionErrors } from 'final-form';

import api, { apiErrorHandler, isApiError } from 'api';
import FormActions from 'components/FormActions';
import extractFinalFormErrorState from 'helpers/extractFinalFormErrorState';
import isEmpty from 'helpers/isEmpty';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchRoles, reset as resetRoles, selectRolesLoadingStatus } from 'models/roles';
import { fetchSegments, reset as resetSegments, selectSegmentsLoadingStatus } from 'models/segments';
import { RolesList } from 'types/role';
import { Segment } from 'types/segment';

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
    parentSegmentId: number | string | null;
    rolesId: Array<number | string>;
    tags: string[];
}

const INITIAL_VALUES: Values = { title: '', parentSegment: null, description: '', roles: [], tags: [] };

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

const submitErrorHandler = (error: unknown): string => {
    const DEFAULT_BAD_REQUEST_MESSAGE = 'Не удалось добавить сегмент. Проверьте введенные данные и повторите попытку.';
    const apiError = apiErrorHandler(error);

    if (apiError?.code === 400) {
        return apiError?.data?.message || DEFAULT_BAD_REQUEST_MESSAGE;
    }

    return apiError.message;
};

const AddingSegmentForm: React.FC = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const rolesIsLoading = useAppSelector(selectRolesLoadingStatus);
    const segmentsIsLoading = useAppSelector(selectSegmentsLoadingStatus);
    const { setAlert } = useErrorAlert();

    const handleCancel = () => {
        navigate('/segments');
    };

    const onSubmit = async (values: Values): Promise<SubmissionErrors | void> => {
        try {
            await api.post<Segment>('/segments', convertToRequestBody(values));
        } catch (error) {
            const message = submitErrorHandler(error);
            setAlert(message);
            return { [FORM_ERROR]: message };
        }
        return navigate('/segments');
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
            initialValues={INITIAL_VALUES}
            validate={validator}
            subscription={{ submitting: true, pristine: true, submitSucceeded: true, submitError: true }}
            render={({ handleSubmit, submitting, submitSucceeded }) => (
                <form id="adding-segment-from" autoComplete="off" onSubmit={handleSubmit}>
                    <Field<string> name={FieldName.Title}>
                        {({ input, meta }) => {
                            const [isError, errorMessage] = extractFinalFormErrorState(meta);
                            return (
                                <TextField
                                    {...input}
                                    label="Наименование *"
                                    error={isError}
                                    helperText={isError && errorMessage}
                                    margin="normal"
                                    disabled={submitting}
                                    fullWidth
                                />
                            );
                        }}
                    </Field>
                    <Field<string> name={FieldName.Description}>
                        {({ input }) => (
                            <TextField
                                {...input}
                                label="Описание"
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
                    <FormActions>
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
                            disabled={rolesIsLoading || segmentsIsLoading || submitSucceeded}
                            loading={submitting}
                        >
                            Добавить
                        </LoadingButton>
                    </FormActions>
                </form>
            )}
        />
    );
};

export default AddingSegmentForm;
