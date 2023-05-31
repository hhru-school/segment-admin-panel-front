import { useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Autocomplete from '@mui/material/Autocomplete';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import ContentBox from 'components/ContentBox';
import ScreensGrid from 'components/ScreensGrid';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchScreens, reset, selectScreensError, selectScreensLoadingStatus } from 'models/screens';

const ScreensPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const isLoading = useAppSelector(selectScreensLoadingStatus);
    const error = useAppSelector(selectScreensError, shallowEqual);

    useEffect(() => {
        void dispatch(fetchScreens());
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
            <Stack direction="row" justifyContent="space-between" gap={4} sx={{ pt: 5, pb: 4 }}>
                <Typography component="h2" variant="h5">
                    Экраны
                </Typography>
                <Box sx={{ flexShrink: 0 }}>
                    <AddButton href="/new/screen" disabled={isLoading}>
                        Новый экран
                    </AddButton>
                </Box>
            </Stack>
            <Box sx={{ maxWidth: 400, pb: 4 }}>
                <Autocomplete
                    options={['Все']}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Версия приложения"
                            InputProps={{
                                ...params.InputProps,
                                startAdornment: (
                                    <>
                                        <InputAdornment position="start">
                                            <FilterAltIcon />
                                        </InputAdornment>
                                        {params.InputProps.startAdornment}
                                    </>
                                ),
                            }}
                        />
                    )}
                    disabled={isLoading}
                />
            </Box>
            <ContentBox loading={isLoading} skeletonWidth={252} skeletonHeight={320}>
                <ScreensGrid />
            </ContentBox>
        </>
    );
};

export default ScreensPage;
