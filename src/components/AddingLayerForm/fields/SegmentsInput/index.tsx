import { useState } from 'react';
import { FieldRenderProps, useForm, useFormState } from 'react-final-form';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import { PageName } from 'components/AddingLayerForm';
import { NewLayer, PagesState, SegmentInputValue, isPagesState } from 'components/AddingLayerForm/types';
import DataTable from 'components/DataTable';
import { useWizard } from 'components/Wizard';

import collapsedDataRender from 'components/AddingLayerForm/fields/SegmentsInput/collapsedDataRender';
import getSegmentsTableColumns from 'components/AddingLayerForm/fields/SegmentsInput/getSegmentsTableColumns';
import getSegmentsTableRows from 'components/AddingLayerForm/fields/SegmentsInput/getSegmentsTableRows';

interface SegmentsInputProps extends FieldRenderProps<NewLayer['segments']> {
    disabled?: boolean;
    loading?: boolean;
}

const SegmentsInput: React.FC<SegmentsInputProps> = ({ input, disabled = false, loading = false }) => {
    const [searchString, setSearchString] = useState('');
    const { state, setPageHandler } = useWizard();

    if (!isPagesState(state)) {
        throw new Error('Не задано предыдущее значение состояния.');
    }

    const form = useForm();
    const {
        values: { segments },
    } = useFormState<NewLayer>();
    const backState: PagesState = { segments, segment: null, entryPoint: null, newDynamicScreen: null };

    const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchString(event.target.value);
    };

    const removeSegmentHandler = (id: number | string) => {
        form.mutators.removeSegment(`id-${id}`);
    };

    const handleSetAddSegmentPage = () => {
        setPageHandler(PageName.AddSegment, backState);
    };

    const columns = getSegmentsTableColumns({ state, disabled, setPageHandler, removeSegmentHandler });
    const rows = getSegmentsTableRows(input.value, searchString);

    return (
        <>
            <Typography component="div" sx={{ color: 'text.secondary', mt: 2, mb: 2 }}>
                Выберете сегменты которые необходимо добавить в слой.
            </Typography>
            <Stack direction="row" alignItems="center" spacing={4} sx={{ mb: 1 }}>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                        <TextField
                            value={searchString}
                            onChange={handleSearch}
                            placeholder="Начните вводить наименование"
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <SearchIcon fontSize="small" />
                                    </InputAdornment>
                                ),
                            }}
                            size="small"
                            disabled={disabled}
                            fullWidth
                        />
                    </Box>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <AddButton onClick={handleSetAddSegmentPage} disabled={disabled}>
                        Добавить сегмент
                    </AddButton>
                </Box>
            </Stack>
            <Box sx={{ mb: 4 }}>
                <DataTable<SegmentInputValue, 'disabled' | 'status' | 'actions'>
                    columns={columns}
                    rows={rows}
                    maxDisplayRows={8}
                    searchString={searchString}
                    emptyMessage="Нет ни одного сегмента."
                    searchEmptyMessage="Не найдено ни одного сегмента."
                    collapsedDataRender={collapsedDataRender}
                    loading={loading}
                />
            </Box>
        </>
    );
};

export default SegmentsInput;
