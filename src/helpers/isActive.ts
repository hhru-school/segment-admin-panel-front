import { ActiveState, ActiveStates } from 'types/common';

const isActive = (state: ActiveState): boolean => {
    return state === ActiveStates.Active;
};

export default isActive;
