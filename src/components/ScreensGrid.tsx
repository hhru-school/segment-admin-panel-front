import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Skeleton from '@mui/material/Skeleton';

import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import { ScreenType, selectScreensList, selectScreensLoadingStatus } from 'models/screens';

import Screen, { Variant } from 'components/Screen';

const variant = new Map<ScreenType, Variant>([
    ['STATIC', Variant.STATIC],
    ['DYNAMIC', Variant.DYNAMIC],
]);

const ScreensGrid: React.FC = () => {
    const screensList = useAppSelector(selectScreensList, shallowEqual);
    const isLoading = useAppSelector(selectScreensLoadingStatus);

    if (isLoading) {
        return <Skeleton component="div" variant="rounded" width={200} height={280} />;
    }

    if (isEmpty(screensList)) {
        return <Alert severity="info">Нет ни одного экрана.</Alert>;
    }

    return (
        <Grid container spacing={{ xs: 2, sm: 4 }} justifyContent={{ xs: 'center', sm: 'flex-start' }}>
            {screensList.map(({ id, title, type, fields, appVersions, filtered }) => (
                <Grid key={id} item xs="auto">
                    <Screen
                        title={title}
                        fields={fields}
                        appVersions={appVersions}
                        variant={variant.get(type)}
                        filtered={filtered}
                    />
                </Grid>
            ))}
        </Grid>
    );
};

export default ScreensGrid;
