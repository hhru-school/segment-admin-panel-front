import { Field, useFormState } from 'react-final-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { FieldName, PageName } from 'components/AddingLayerForm';
import ParentLayerField from 'components/AddingLayerForm/fields/ParentLayerField';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';
import extractFinalFormErrorState from 'helpers/extractFinalFormErrorState';
import { LayersListItem } from 'types/layer';

const InfoPage: React.FC = () => {
    const { setPageHandler } = useWizard();
    const state = useFormState();

    const nextPageHandle = () => {
        if (state.valid) {
            setPageHandler(PageName.Segments);
        }
    };

    return (
        <>
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
                            disabled={meta.submitting}
                            fullWidth
                        />
                    );
                }}
            </Field>
            <Field<string> name={FieldName.Description}>
                {({ input, meta }) => (
                    <TextField
                        {...input}
                        label="Описание"
                        margin="normal"
                        multiline
                        rows={3}
                        disabled={meta.submitting}
                        fullWidth
                    />
                )}
            </Field>
            <Field<LayersListItem | null> name={FieldName.ParentLayer} allowNull>
                {(props) => <ParentLayerField {...props} />}
            </Field>
            <FormActions>
                <Button href="/layers" variant="outlined" color="inherit" sx={{ minWidth: 112 }}>
                    Отмена
                </Button>
                <Button type="submit" variant="contained" sx={{ minWidth: 112 }} onClick={nextPageHandle}>
                    Далее
                </Button>
            </FormActions>
        </>
    );
};

export default InfoPage;
