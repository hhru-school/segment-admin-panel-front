import { useCallback, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AddButton from 'components/AddButton';
import ContentBox from 'components/ContentBox';
import FieldsTree from 'components/FieldsTree';
import SearchForm from 'components/SearchForm';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import { fetchFields, reset, selectFieldsLoadingStatus, selectFieldsError, setSearchString } from 'models/fields';

const FieldsPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const isLoading = useAppSelector(selectFieldsLoadingStatus);
    const error = useAppSelector(selectFieldsError, shallowEqual);

    const handleSearch = useCallback(
        (searchString: string) => {
            void dispatch(fetchFields(searchString));
            dispatch(setSearchString(searchString));
        },
        [dispatch]
    );

    useEffect(() => {
        void dispatch(fetchFields());
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
            <Stack direction="row" alignItems="center" spacing={4}>
                <Box sx={{ flexBasis: 140 }}>
                    <Typography component="h2" variant="h5">
                        Поля
                    </Typography>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    <Box sx={{ maxWidth: 700, minWidth: 340 }}>
                        <SearchForm onSubmit={handleSearch} disabled={isLoading} />
                    </Box>
                </Box>
                <Box sx={{ flexShrink: 0 }}>
                    <AddButton href="/new/field" disabled={isLoading}>
                        Добавить поле
                    </AddButton>
                </Box>
            </Stack>
            <ContentBox loading={isLoading} skeletonWidth="100%" skeletonHeight={55}>
                <FieldsTree />
            </ContentBox>
        </>
    );
};

export default FieldsPage;
