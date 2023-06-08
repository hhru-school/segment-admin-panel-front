import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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
        void dispatch(fetchField(Number(fieldId)))
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
            <ContentBox loading={isLoading} skeletonWidth="100%" skeletonHeight={170}>
                <FieldTree />
            </ContentBox>
        </SecondaryLayout>
    );
};

export default FieldPage;
