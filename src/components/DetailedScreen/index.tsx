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
import Header from 'components/DetailedScreen/Header';

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
            <Header
                state={
                    <>
                        {isNew && <ChangeStatusChip type={ChangeStates.New} />}
                        {disabled && <ActiveStatusChip type={ActiveStates.Disabled} />}
                    </>
                }
            >
                {title}
            </Header>
            <Typography sx={{ color: disabled ? 'inherit' : 'text.secondary' }}>{description}</Typography>
            <Typography>Тип: {screenType.get(type)}</Typography>
            <FieldsList list={fields} disabled={disabled} />
            <AppVersions versions={appVersions} />
        </Card>
    );
};

export default DetailedScreen;
