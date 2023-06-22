import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import ActiveStatusChip from 'components/ActiveStatusChip';
import AppVersions from 'components/AppVersions';
import ChangeStatusChip from 'components/ChangeStatusChip';
import PositionView from 'components/PositionView';
import { ChangeStates, ActiveStates } from 'types/common';
import { ScreenFieldList } from 'types/field';
import { ScreenType, ScreenTypes } from 'types/screen';
import { VersionsList } from 'types/version';

import Card from 'components/DetailedScreen/Card';
import FieldsList from 'components/DetailedScreen/FieldsList';

interface DetailedScreenProps {
    title: string;
    description: string;
    type: ScreenType;
    position: number;
    previousPosition?: number;
    fields: ScreenFieldList;
    appVersions: VersionsList;
    isNew?: boolean;
    disabled?: boolean;
}

const screenType = new Map<ScreenType, string>([
    [ScreenTypes.Static, 'Статический'],
    [ScreenTypes.Dynamic, 'Динамический'],
]);

const DetailedScreen: React.FC<DetailedScreenProps> = ({
    title,
    description,
    type,
    position,
    previousPosition,
    fields,
    appVersions,
    isNew,
    disabled,
}) => {
    return (
        <Card
            variant={type}
            positionView={
                <PositionView
                    variant="screen"
                    position={position}
                    previousPosition={previousPosition}
                    disabled={disabled}
                />
            }
            disabled={disabled}
        >
            <Stack direction="row" alignItems="center" spacing={2}>
                <Typography component="h3" variant="h6" sx={{ flexGrow: 1, overflowWrap: 'break-word' }}>
                    {title}
                </Typography>
                {disabled && <ActiveStatusChip type={ActiveStates.Disabled} />}
                {isNew && <ChangeStatusChip type={ChangeStates.New} />}
            </Stack>
            <Typography sx={{ color: disabled ? 'inherit' : 'text.secondary' }}>{description}</Typography>
            <Typography>Тип: {screenType.get(type)}</Typography>
            <FieldsList list={fields} disabled={disabled} />
            <AppVersions versions={appVersions} />
        </Card>
    );
};

export default DetailedScreen;
