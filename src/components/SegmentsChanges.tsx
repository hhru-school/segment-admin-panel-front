import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectArchivedSegments, selectCreatedSegments, selectLayerChangesLoadingStatus } from 'models/layerChanges';

import ChangesListItem from 'components/ChangesListItem';
import ContentBox from 'components/ContentBox';

const SegmentsChanges: React.FC = () => {
    const isLoading = useAppSelector(selectLayerChangesLoadingStatus);
    const createdSegments = useAppSelector(selectCreatedSegments, shallowEqual);
    const archiveSegments = useAppSelector(selectArchivedSegments, shallowEqual);

    if (!isLoading && createdSegments === null && archiveSegments === null) {
        return (
            <ContentBox title="Сегменты">
                <Alert severity="info">Изменений нет.</Alert>
            </ContentBox>
        );
    }

    return (
        <ContentBox title="Сегменты" loading={isLoading} skeletonWidth="100%" skeletonHeight={48}>
            {createdSegments !== null && (
                <List disablePadding>
                    {createdSegments.map((item) => (
                        <ChangesListItem key={item.id} text={item.title} variant="created" />
                    ))}
                </List>
            )}
            {archiveSegments !== null && (
                <List disablePadding>
                    {archiveSegments.map((item) => (
                        <ChangesListItem key={item.id} text={item.title} variant="archive" />
                    ))}
                </List>
            )}
        </ContentBox>
    );
};

export default SegmentsChanges;
