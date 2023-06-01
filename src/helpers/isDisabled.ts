import { ActiveState, ActiveStates } from 'types/common';

const isDisabled = <T extends { activeState: ActiveState }>(item: T): boolean => {
    return item.activeState === ActiveStates.Disabled;
};

export default isDisabled;
