import { useCallback, useEffect } from 'react';
import { shallowEqual } from 'react-redux';
import Box from '@mui/material/Box';

import AddButton from 'components/AddButton';
import AddButtonWrapper from 'components/AddButton/AddButtonWrapper';
import ContentBox from 'components/ContentBox';
import FieldsTree from 'components/FieldsTree';
import SearchForm from 'components/SearchForm';
import Title from 'components/Title';
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
            void dispatch(fetchFields({ layerId: 7, searchString }));
            dispatch(setSearchString(searchString));
        },
        [dispatch]
    );

    useEffect(() => {
        void dispatch(fetchFields({ layerId: 7, searchString: '' }));
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
            <Title>Поля</Title>
            <AddButtonWrapper>
                <AddButton href="/new/field" disabled={isLoading}>
                    Добавить поле
                </AddButton>
            </AddButtonWrapper>
            <Box sx={{ mb: 2 }}>
                <SearchForm onSubmit={handleSearch} disabled={isLoading} />
            </Box>
            <ContentBox loading={isLoading} SkeletonProps={{ height: 48, width: '100%' }}>
                <FieldsTree />
            </ContentBox>
        </>
    );
};

export default FieldsPage;
