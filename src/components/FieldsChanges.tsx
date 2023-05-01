import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectCreatedQuestion, selectArchivedQuestion, selectLayerChangesLoadingStatus } from 'models/layerChanges';

import ContentBox from 'components/ContentBox';
import QuestionTree from 'components/QuestionTree';
import Subtitle from 'components/Subtitle';

const FieldsChanges: React.FC = () => {
    const isLoading = useAppSelector(selectLayerChangesLoadingStatus);
    const createdQuestion = useAppSelector(selectCreatedQuestion, shallowEqual);
    const archiveQuestion = useAppSelector(selectArchivedQuestion, shallowEqual);

    if (!isLoading && createdQuestion === null && archiveQuestion === null) {
        return (
            <>
                <Subtitle>Поля</Subtitle>
                <ContentBox>
                    <Alert severity="info">Изменений нет.</Alert>
                </ContentBox>
            </>
        );
    }

    return (
        <>
            <Subtitle>Поля</Subtitle>
            <ContentBox loading={isLoading} SkeletonProps={{ height: 48, width: '100%' }}>
                {createdQuestion !== null && <QuestionTree items={createdQuestion} variant="created" />}
                {archiveQuestion !== null && <QuestionTree items={archiveQuestion} variant="archive" />}
            </ContentBox>
        </>
    );
};

export default FieldsChanges;
