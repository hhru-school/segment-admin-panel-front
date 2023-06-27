import { Field, useFormState } from 'react-final-form';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

import { PageName } from 'components/AddingLayerForm';
import ParentLayerInput from 'components/AddingLayerForm/fields/ParentLayerInput';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';
import extractFinalFormErrorState from 'helpers/extractFinalFormErrorState';
import { LayersListItem } from 'types/layer';

const InfoPage: React.FC = () => {
    const { setActivePageHandler } = useWizard();
    const state = useFormState();

    const handelSetNextPage = () => {
        if (state.valid) {
            setActivePageHandler(PageName.Segments);
        }
    };

    return (
        <>
            <Field<string> name="title">
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
            <Field<string> name="description">
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
            <Field<LayersListItem | null> name="parentLayer" allowNull>
                {(props) => <ParentLayerInput {...props} />}
            </Field>
            <FormActions>
                <Button href="/layers" variant="outlined" color="inherit" sx={{ minWidth: 112 }}>
                    Отмена
                </Button>
                <Button type="submit" variant="contained" sx={{ minWidth: 112 }} onClick={handelSetNextPage}>
                    Далее
                </Button>
            </FormActions>
        </>
    );
};

export default InfoPage;
