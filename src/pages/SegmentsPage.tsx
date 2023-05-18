import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import SearchForm from 'components/SearchForm';
import SegmentsTable from 'components/SegmentsTable';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchSegments, reset, selectSegmentsLoadingStatus, selectSegmentsError } from 'models/segments';

const SegmentsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const isLoading = useAppSelector(selectSegmentsLoadingStatus);
    const error = useAppSelector(selectSegmentsError, shallowEqual);

    useEffect(() => {
        void dispatch(fetchSegments());
        return () => {
            dispatch(reset());
        };
    }, [dispatch]);

    useEffect(() => {
        if (error !== null) {
            setAlert(error.message);
        }
    }, [error, setAlert]);

    return (
        <>
            <Stack direction="row" alignItems="center" gap={4} sx={{ pt: 5, pb: 4 }}>
                <Box sx={{ flexBasis: 140 }}>
                    <Typography component="h2" variant="h5">
                        Сегменты
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                        <SearchForm disabled={isLoading} />
                    </Box>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <AddButton href="/new/segment" disabled={isLoading}>
                        Новый сегмент
                    </AddButton>
                </Box>
            </Stack>
            <SegmentsTable />
        </>
    );
};

export default SegmentsPage;
