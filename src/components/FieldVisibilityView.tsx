import HideIcon from 'icons/Hide';
import HidePrefilledIcon from 'icons/HidePrefilled';
import ShowIcon from 'icons/Show';
import ShowPrefilledIcon from 'icons/ShowPrefilled';
import { FieldVisibilityState, FieldVisibilityStates } from 'types/field';

import ChangeBox from 'components/ChangeBox';
import IconWrapper from 'components/IconWrapper';

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
    const isChanged = previousState !== null && previousState !== state;

    return (
        <ChangeBox
            currentValue={<IconWrapper>{icon.get(state)}</IconWrapper>}
            previousValue={isChanged && <IconWrapper>{icon.get(previousState)}</IconWrapper>}
            changed={isChanged}
        />
    );
};

export default FieldVisibilityView;
export { icon };
