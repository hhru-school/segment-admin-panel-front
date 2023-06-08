import HideIcon from 'icons/Hide';
import HidePrefilledIcon from 'icons/HidePrefilled';
import ShowIcon from 'icons/Show';
import ShowPrefilledIcon from 'icons/ShowPrefilled';
import { FieldVisibilityState, FieldVisibilityStates } from 'types/field';

import ChangeBox from 'components/ChangeBox';

interface FieldVisibilityProps {
    state: FieldVisibilityState;
    previousState?: FieldVisibilityState | null;
}

const icon = new Map<FieldVisibilityState, JSX.Element>([
    [FieldVisibilityStates.Show, <ShowIcon color="inherit" />],
    [FieldVisibilityStates.ShowPrefilled, <ShowPrefilledIcon color="inherit" />],
    [FieldVisibilityStates.Hide, <HideIcon color="inherit" />],
    [FieldVisibilityStates.HidePrefilled, <HidePrefilledIcon color="inherit" />],
]);

const FieldVisibilityView: React.FC<FieldVisibilityProps> = ({
    state = FieldVisibilityStates.Show,
    previousState = null,
}) => {
    return <ChangeBox currentValue={icon.get(state)} previousValue={previousState ? icon.get(previousState) : null} />;
};

export default FieldVisibilityView;
