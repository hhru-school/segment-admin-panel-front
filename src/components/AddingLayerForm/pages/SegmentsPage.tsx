import { Field, useFormState } from 'react-final-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { FieldName, PageName } from 'components/AddingLayerForm';
import LayerSegmentsField from 'components/AddingLayerForm/fields/LayerSegmentsField';
import useInitSegmentsField from 'components/AddingLayerForm/fields/LayerSegmentsField/useInitSegmentsField';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';
import { SegmentsFieldValue } from 'types/segment';

const SegmentsPage: React.FC = () => {
    const { setPageHandler } = useWizard();
    const { submitting, submitSucceeded } = useFormState();
    const loading = useInitSegmentsField();
    const disabled = loading || submitting || submitSucceeded;

    const previousPageHandle = () => {
        setPageHandler(PageName.Info);
    };

    return (
        <>
            <Field<SegmentsFieldValue> name={FieldName.Segments}>
                {(props) => <LayerSegmentsField {...props} loading={loading} disabled={disabled} />}
            </Field>
            <FormActions>
                <Box sx={{ flexGrow: 1 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{ minWidth: 112 }}
                        onClick={previousPageHandle}
                        disabled={disabled}
                    >
                        Назад
                    </Button>
                </Box>
                <Button href="/layers" variant="outlined" color="inherit" sx={{ minWidth: 112 }} disabled={disabled}>
                    Отмена
                </Button>
                <LoadingButton type="submit" variant="contained" disabled={disabled} loading={submitting}>
                    Сформировать слой
                </LoadingButton>
            </FormActions>
        </>
    );
};

export default SegmentsPage;
