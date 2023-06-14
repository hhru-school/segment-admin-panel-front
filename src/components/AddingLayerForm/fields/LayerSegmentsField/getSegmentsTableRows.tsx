import { SegmentsFieldItem, SegmentsFieldValue } from 'types/segment';

const getSegmentsTableRows = (value: SegmentsFieldValue | null, searchString?: string): SegmentsFieldItem[] => {
    const rows = value ? Object.keys(value).map((key) => value[key]) : [];

    if (searchString) {
        const regexp = new RegExp(searchString, 'i');
        return rows.filter(({ title }) => regexp.test(title));
    }

    return rows;
};

export default getSegmentsTableRows;
