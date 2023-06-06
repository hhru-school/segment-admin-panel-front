import { shallowEqual } from 'react-redux';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import isDisabled from 'helpers/isDisabled';
import isEmpty from 'helpers/isEmpty';
import { useAppSelector } from 'hooks/redux-hooks';
import {
    selectCurrentLayerSegmentsList,
    selectCurrentLayerSegmentsLoadingStatus,
    selectCurrentLayerSegmentsSearchString,
} from 'models/currentLayerSegments';
import { LayerSegmentsListItem } from 'types/segment';

import ActiveStatusChip from 'components/ActiveStatusChip';
import ChangeStatusChip from 'components/ChangeStatusChip';
import DataTable, { Columns } from 'components/DataTable';
import LightenChip from 'components/LightenChip';
import SearchView from 'components/SearchView';

const columns: Columns<LayerSegmentsListItem, 'details' | 'status'> = [
    {
        key: 'title',
        field: 'title',
        headerName: 'Наименование',
        align: 'left',
        sx: { width: 300 },
        valueGetter: (listItem, searchString = '') => {
            if (listItem === undefined) {
                return listItem;
            }

            const disabled = isDisabled(listItem.activeState);

            if (!isEmpty(searchString)) {
                return (
                    <SearchView subString={searchString} variant="body2" disabled={disabled}>
                        {listItem.title}
                    </SearchView>
                );
            }
            if (disabled) {
                return (
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {listItem.title}
                    </Typography>
                );
            }
            return listItem.title;
        },
    },
    {
        key: 'status',
        headerName: 'Статус',
        align: 'center',
        sx: { width: 250 },
        valueGetter: (listItem) => {
            if (listItem === undefined) {
                return listItem;
            }
            if (isDisabled(listItem.activeState)) {
                return <ActiveStatusChip type={listItem.activeState} />;
            }
            return <ChangeStatusChip type={listItem.changeState} variant="outlined" />;
        },
    },
    {
        key: 'id',
        field: 'id',
        headerName: 'ID',
        align: 'center',
        sx: { width: 100 },
        valueGetter: (listItem) => {
            if (listItem && isDisabled(listItem.activeState)) {
                return (
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        {listItem.id}
                    </Typography>
                );
            }
            return listItem && listItem.id;
        },
    },
    {
        key: 'details',
        align: 'right',
        sx: { width: 110 },
        valueGetter: (listItem) => {
            if (listItem === undefined) {
                return listItem;
            }
            if (isDisabled(listItem.activeState)) {
                return (
                    <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                        Подробнее
                    </Typography>
                );
            }
            return (
                <Link href={`${listItem.id}`} underline="hover">
                    Подробнее
                </Link>
            );
        },
    },
];

const collapsedDataRender = (item: LayerSegmentsListItem): React.ReactNode => {
    const disabled = isDisabled(item.activeState);

    return (
        <Stack spacing={2} sx={{ color: disabled ? 'text.disabled' : 'inherit' }}>
            <Typography variant="subtitle2">Роли</Typography>
            <Stack direction="row" spacing={2}>
                {item.roles.map(({ id, name }) => (
                    <LightenChip key={id} label={name} color={disabled ? 'default' : 'primary'} disabled={disabled} />
                ))}
            </Stack>
            <Typography variant="subtitle2">Теги</Typography>
            <Stack direction="row" spacing={2}>
                {item.tags.map((name) => (
                    <LightenChip
                        key={name}
                        label={name}
                        color={disabled ? 'default' : 'secondary'}
                        disabled={disabled}
                    />
                ))}
            </Stack>
        </Stack>
    );
};

const LayerSegmentsTable: React.FC = () => {
    const isLoading = useAppSelector(selectCurrentLayerSegmentsLoadingStatus);
    const layerSegmentsList = useAppSelector(selectCurrentLayerSegmentsList, shallowEqual);
    const searchString = useAppSelector(selectCurrentLayerSegmentsSearchString);

    return (
        <DataTable<LayerSegmentsListItem, 'details' | 'status'>
            columns={columns}
            rows={layerSegmentsList}
            searchString={searchString}
            emptyMessage="Нет ни одного сегмента."
            searchEmptyMessage="Не найдено ни одного сегмента."
            collapsedDataRender={collapsedDataRender}
            loading={isLoading}
        />
    );
};

export default LayerSegmentsTable;
