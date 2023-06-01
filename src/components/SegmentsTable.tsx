import { shallowEqual } from 'react-redux';
import Link from '@mui/material/Link';

import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import { selectSegments, selectSegmentsLoadingStatus, selectSegmentsSearchString } from 'models/segments';
import { Segment } from 'types/segment';

import DataTable, { Columns } from 'components/DataTable';
import SearchView from 'components/SearchView';

const columns: Columns<Segment, 'details'> = [
    {
        key: 'title',
        field: 'title',
        headerName: 'Наименование',
        align: 'left',
        sx: { width: 100 },
        valueGetter: (segment, searchString = '') => {
            if (segment === undefined) {
                return segment;
            }
            return !isEmpty(searchString) ? (
                <SearchView subString={searchString} variant="body2">
                    {segment.title}
                </SearchView>
            ) : (
                segment.title
            );
        },
    },
    {
        key: 'createTime',
        field: 'createTime',
        headerName: 'Создан',
        align: 'center',
        sx: { width: 100 },
        valueGetter: (segment) => {
            if (segment === undefined) {
                return segment;
            }
            return new Date(segment.createTime).toLocaleString('ru', {
                dateStyle: 'short',
                timeStyle: 'medium',
            });
        },
    },
    {
        key: 'details',
        align: 'right',
        sx: { width: 100 },
        valueGetter: (segment) => {
            if (segment === undefined) {
                return segment;
            }
            return (
                <Link href={`/segments/${segment.id}`} underline="hover">
                    Подробнее
                </Link>
            );
        },
    },
];

const SegmentsTable: React.FC = () => {
    const isLoading = useAppSelector(selectSegmentsLoadingStatus);
    const segments = useAppSelector(selectSegments, shallowEqual);
    const searchString = useAppSelector(selectSegmentsSearchString);

    return (
        <DataTable<Segment, 'details'>
            columns={columns}
            rows={segments}
            searchString={searchString}
            emptyMessage="Нет ни одного сегмента."
            searchEmptyMessage="Не найдено ни одного сегмента."
            loading={isLoading}
        />
    );
};

export default SegmentsTable;
