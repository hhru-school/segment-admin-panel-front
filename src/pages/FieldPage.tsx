import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Box from '@mui/material/Box';

import { isApiError } from 'api';
import ContentBox from 'components/ContentBox';
import FieldTree from 'components/FieldTree';
import { useAppDispatch, useAppSelector } from 'hooks/redux-hooks';
import useErrorAlert from 'hooks/useErrorAlert';
import SecondaryLayout from 'layouts/SecondaryLayout';
import { fetchField, reset, selectCurrentFieldTitle, selectCurrentFieldLoadingStatus } from 'models/currentField';

const FieldPage: React.FC = () => {
    const dispatch = useAppDispatch();
    const { setAlert } = useErrorAlert();
    const navigate = useNavigate();
    const { fieldId } = useParams();
    const isLoading = useAppSelector(selectCurrentFieldLoadingStatus);
    const title = useAppSelector(selectCurrentFieldTitle);

    useEffect(() => {
        void dispatch(fetchField({ layerId: 7, questionId: Number(fieldId) }))
            .unwrap()
            .catch((error) => {
                if (isApiError(error)) {
                    if (error.code === 404) {
                        navigate('/not-found', { replace: true });
                    } else {
                        setAlert(error.message);
                    }
                }
            });
        return () => {
            dispatch(reset());
        };
    }, [fieldId, dispatch, navigate, setAlert]);

    return (
        <SecondaryLayout title={title || 'Нет данных'} loading={isLoading} backHref="/fields">
            <Box sx={{ pt: 5 }}>
                <ContentBox loading={isLoading} skeletonWidth="100%" skeletonHeight={170}>
                    <FieldTree />
                </ContentBox>
            </Box>
        </SecondaryLayout>
    );
};

export default FieldPage;
