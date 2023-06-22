import { NewLayer, SegmentInputValue } from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';

const getSegmentsTableRows = (value: NewLayer['segments'], searchString?: string): SegmentInputValue[] => {
    const rows = value ? idMapToArray(value) : [];

    if (searchString) {
        const regexp = new RegExp(searchString, 'i');
        return rows.filter(({ title }) => regexp.test(title));
    }

    return rows;
};

export default getSegmentsTableRows;
