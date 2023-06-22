import { SegmentFieldInputValue, SegmentFieldInputValues } from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';

const getSegmentFieldsTableRows = (value?: SegmentFieldInputValues): SegmentFieldInputValue[] => {
    const rows = value ? idMapToArray(value) : [];
    return rows.sort(({ title: a }, { title: b }) => a.localeCompare(b));
};

export default getSegmentFieldsTableRows;
