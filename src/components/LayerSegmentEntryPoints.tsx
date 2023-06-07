import { shallowEqual } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

import indexToPosition from 'helpers/indexToPosition';
import isDisabled from 'helpers/isDisabled';
import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectCurrentLayerSegmentEntryPoints } from 'models/currentLayerSegment';
import { DetailedScreenList } from 'types/screen';

import AccordionItem from 'components/AccordionItem';
import DetailedScreen from 'components/DetailedScreen';

const renderScreens = (screens: DetailedScreenList): JSX.Element | Array<JSX.Element> => {
    if (isEmpty(screens)) {
        return (
            <Alert severity="info" sx={{ width: '100%', justifyContent: 'center', my: 1 }}>
                Нет ни одного экрана.
            </Alert>
        );
    }

    return screens.map(({ id, oldPosition, state, ...rest }, index) => (
        <Box key={id} width={600}>
            <DetailedScreen
                position={indexToPosition(index)}
                previousPosition={oldPosition}
                disabled={isDisabled(state)}
                {...rest}
            />
        </Box>
    ));
};

const LayerSegmentEntryPoints: React.FC = () => {
    const entryPoints = useAppSelector(selectCurrentLayerSegmentEntryPoints, shallowEqual);

    return (
        <>
            {entryPoints.map(({ id, screens, ...rest }) => (
                <AccordionItem key={id} {...rest}>
                    {renderScreens(screens)}
                </AccordionItem>
            ))}
        </>
    );
};

export default LayerSegmentEntryPoints;
