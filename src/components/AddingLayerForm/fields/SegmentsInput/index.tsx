import { useState } from 'react';
import { FieldRenderProps } from 'react-final-form';
import SearchIcon from '@mui/icons-material/Search';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import { NewLayer, SegmentInputValue } from 'components/AddingLayerForm/types';
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
    const { setPageHandler } = useWizard();
    const columns = getSegmentsTableColumns({ disabled, setPageHandler });
    const rows = getSegmentsTableRows(input.value, searchString);

    const searchHandle: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSearchString(event.target.value);
    };

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
                            onChange={searchHandle}
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
                    <AddButton disabled={disabled}>Добавить сегмент</AddButton>
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
