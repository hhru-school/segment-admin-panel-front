import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';

import { useAppSelector } from 'hooks/redux-hooks';
import {
    selectCreatedEntryPoints,
    selectArchivedEntryPoints,
    selectLayerChangesLoadingStatus,
} from 'models/layerChanges';

import ChangesListItem from 'components/ChangesListItem';
import ContentBox from 'components/ContentBox';

const EntryPointsChanges: React.FC = () => {
    const isLoading = useAppSelector(selectLayerChangesLoadingStatus);
    const createdEntryPoints = useAppSelector(selectCreatedEntryPoints, shallowEqual);
    const archiveEntryPoints = useAppSelector(selectArchivedEntryPoints, shallowEqual);

    if (!isLoading && createdEntryPoints === null && archiveEntryPoints === null) {
        return (
            <ContentBox title="Точки входа">
                <Alert severity="info">Изменений нет.</Alert>
            </ContentBox>
        );
    }

    return (
        <ContentBox title="Точки входа" loading={isLoading} skeletonWidth="100%" skeletonHeight={48}>
            {createdEntryPoints !== null && (
                <List disablePadding>
                    {createdEntryPoints.map((item) => (
                        <ChangesListItem key={item.id} text={item.title} variant="created" />
                    ))}
                </List>
            )}
            {archiveEntryPoints !== null && (
                <List disablePadding>
                    {archiveEntryPoints.map((item) => (
                        <ChangesListItem key={item.id} text={item.title} variant="archive" />
                    ))}
                </List>
            )}
        </ContentBox>
    );
};

export default EntryPointsChanges;
