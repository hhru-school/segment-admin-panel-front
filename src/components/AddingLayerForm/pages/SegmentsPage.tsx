import { Field, useFormState } from 'react-final-form';
import LoadingButton from '@mui/lab/LoadingButton';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import { PageName } from 'components/AddingLayerForm';
import SegmentsInput from 'components/AddingLayerForm/fields/SegmentsInput';
import useInitSegments from 'components/AddingLayerForm/hooks/useInitSegments';
import { NewLayer } from 'components/AddingLayerForm/types';
import FormActions from 'components/FormActions';
import { useWizard } from 'components/Wizard';

const SegmentsPage: React.FC = () => {
    const { setPageHandler } = useWizard();
    const { submitting, submitSucceeded } = useFormState();
    const loading = useInitSegments();
    const disabled = loading || submitting || submitSucceeded;

    const handleSetPreviousPage = () => {
        setPageHandler(PageName.Info);
    };

    return (
        <>
            <Field<NewLayer['segments']> name="segments">
                {(props) => <SegmentsInput {...props} loading={loading} disabled={disabled} />}
            </Field>
            <FormActions>
                <Box sx={{ flexGrow: 1 }}>
                    <Button
                        variant="outlined"
                        color="inherit"
                        sx={{ minWidth: 112 }}
                        onClick={handleSetPreviousPage}
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
