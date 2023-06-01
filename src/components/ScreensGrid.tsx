import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';

import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectScreensList } from 'models/screens';
import { ScreenType } from 'types/screen';

import Screen, { Variant } from 'components/Screen';

const variant = new Map<ScreenType, Variant>([
    ['STATIC', Variant.STATIC],
    ['DYNAMIC', Variant.DYNAMIC],
]);

const ScreensGrid: React.FC = () => {
    const screensList = useAppSelector(selectScreensList, shallowEqual);

    if (isEmpty(screensList)) {
        return <Alert severity="info">Нет ни одного экрана.</Alert>;
    }

    return (
        <Grid
            container
            rowSpacing={{ xs: 2, sm: 4 }}
            columnSpacing={8}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
            {screensList.map(({ id, title, type, fields, appVersions, filtered }) => (
                <Grid key={id} item xs={12} sm={6} md={4} lg={3}>
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
