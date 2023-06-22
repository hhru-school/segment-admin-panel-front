import { Mutator } from 'final-form';

import getSegmentName from 'components/AddingLayerForm/helpers/getSegmentName';
import { NewLayer, ScreenInputValues, SegmentFieldInputValues } from 'components/AddingLayerForm/types';
import createIdMap from 'helpers/createIdMap';
import idMapToArray from 'helpers/idMapToArray';
import removeKey from 'helpers/removeField';
import { IdMapKey } from 'types/common';

const removeScreen: Mutator<NewLayer> = ([name, id]: [string, number | string], state, { changeValue }) => {
    const key: IdMapKey = `id-${id}`;
    changeValue(state, `${name}.screens`, (screens: ScreenInputValues): ScreenInputValues => {
        changeValue(
            state,
            `${getSegmentName(name)}.fields`,
            (segmentFields: SegmentFieldInputValues): SegmentFieldInputValues => {
                const { fields } = screens[key];

                const newSegmentFields = idMapToArray(segmentFields).filter(
                    ({ id, isNew }) => !isNew || !fields[`id-${id}`]
                );
                return createIdMap(newSegmentFields);
            }
        );
        return removeKey(screens, key);
    });
};

export default removeScreen;
