import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

import { useAppSelector } from 'hooks/redux-hooks';
import { selectArchivedSegments, selectCreatedSegments, selectLayerChangesLoadingStatus } from 'models/layerChanges';

import ChangesListItem from 'components/ChangesListItem';
import ContentBox from 'components/ContentBox';
import Subtitle from 'components/Subtitle';

const SegmentsChanges: React.FC = () => {
    const isLoading = useAppSelector(selectLayerChangesLoadingStatus);
    const createdSegments = useAppSelector(selectCreatedSegments, shallowEqual);
    const archiveSegments = useAppSelector(selectArchivedSegments, shallowEqual);

    if (!isLoading && createdSegments === null && archiveSegments === null) {
        return (
            <>
                <Subtitle>Сегменты</Subtitle>
                <ContentBox>
                    <Alert severity="info">Изменений нет.</Alert>
                </ContentBox>
            </>
        );
    }

    return (
        <>
            <Subtitle>Сегменты</Subtitle>
            <ContentBox loading={isLoading} SkeletonProps={{ height: 48, width: '100%' }}>
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
        </>
    );
};

export default SegmentsChanges;
