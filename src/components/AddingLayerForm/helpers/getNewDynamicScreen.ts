import { ScreenInputValue } from 'components/AddingLayerForm/types';
import counter from 'helpers/counter';

const getNextId = counter();

const getNewDynamicScreen = (): ScreenInputValue => {
    return {
        id: `new-${getNextId()}`,
        type: 'DYNAMIC',
        state: 'ACTIVE',
        title: 'Динамический экран',
        description: '',
        fields: {},
        appVersions: [],
        position: 0,
        isNew: true,
    };
};

export default getNewDynamicScreen;
