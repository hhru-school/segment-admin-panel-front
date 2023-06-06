import { ActiveState, ActiveStates } from 'types/common';

const isDisabled = (state: ActiveState): boolean => {
    return state === ActiveStates.Disabled;
};

export default isDisabled;
