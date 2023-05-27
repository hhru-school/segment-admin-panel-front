import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectCreatedQuestion, selectArchivedQuestion, selectLayerChangesLoadingStatus } from 'models/layerChanges';

import ContentBox from 'components/ContentBox';
import QuestionTree from 'components/QuestionTree';

const FieldsChanges: React.FC = () => {
    const isLoading = useAppSelector(selectLayerChangesLoadingStatus);
    const createdQuestion = useAppSelector(selectCreatedQuestion, shallowEqual);
    const archiveQuestion = useAppSelector(selectArchivedQuestion, shallowEqual);

    if (!isLoading && createdQuestion === null && archiveQuestion === null) {
        return (
            <ContentBox title="Поля">
                <Alert severity="info">Изменений нет.</Alert>
            </ContentBox>
        );
    }

    return (
        <ContentBox title="Поля" loading={isLoading} skeletonWidth="100%" skeletonHeight={48}>
            {createdQuestion !== null && <QuestionTree items={createdQuestion} variant="created" />}
            {archiveQuestion !== null && <QuestionTree items={archiveQuestion} variant="archive" />}
        </ContentBox>
    );
};

export default FieldsChanges;
