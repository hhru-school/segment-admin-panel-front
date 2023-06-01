import { ActiveState } from 'types/common';

const isDisabled = <T extends { activeState: ActiveState }>(item: T): boolean => {
    return item.activeState === 'DISABLED';
};

export default isDisabled;
