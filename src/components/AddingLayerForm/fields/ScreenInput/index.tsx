import { Field, useField, useForm } from 'react-final-form';
import ClearIcon from '@mui/icons-material/Clear';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import ActiveStatusChip from 'components/ActiveStatusChip';
import getEntryPointName from 'components/AddingLayerForm/helpers/getEntryPointName';
import getSegmentName from 'components/AddingLayerForm/helpers/getSegmentName';
import { ScreenInputValue } from 'components/AddingLayerForm/types';
import AppVersions from 'components/AppVersions';
import ChangeStatusChip from 'components/ChangeStatusChip';
import Card from 'components/DetailedScreen/Card';
import PositionView from 'components/PositionView';
import isActive from 'helpers/isActive';
import isDisabled from 'helpers/isDisabled';
import { ChangeStates, ActiveStates, ActiveState } from 'types/common';
import { ScreenType, ScreenTypes } from 'types/screen';

import ScreenFieldsInput from 'components/AddingLayerForm/fields/ScreenInput/ScreenFieldsInput';

interface ScreenInputProps {
    name: string;
    screen: ScreenInputValue;
    forceRenderParent: () => void;
}

const screenType = new Map<ScreenType, string>([
    [ScreenTypes.Static, 'Статический'],
    [ScreenTypes.Dynamic, 'Динамический'],
]);

const ScreenInput: React.FC<ScreenInputProps> = ({ name, forceRenderParent }) => {
    const {
        input: { value: screen },
    } = useField<ScreenInputValue>(name, { subscription: { value: true } });
    const { id, title, description, fields, appVersions, type, position, oldPosition, state, isNew } = screen;
    const form = useForm();
    const segmentName = getSegmentName(name);
    const entryPointName = getEntryPointName(name);
    const disabled = isDisabled(state);
    const isDynamic = type === ScreenTypes.Dynamic;

    const handleDisableScreen = (event: React.ChangeEvent<HTMLElement>, checked: boolean) => {
        form.change(`${name}.state`, checked ? ActiveStates.Active : ActiveStates.Disabled);
        form.mutators.updateSegmentFields(segmentName);
    };

    const handleRemoveScreen = () => {
        form.mutators.removeScreen(entryPointName, id);
        form.mutators.calcNewScreensPosition(`${entryPointName}.screens`);
        form.mutators.updateSegmentFields(segmentName);
        forceRenderParent();
    };

    return (
        <Stack direction="row">
            <Card
                variant={type}
                positionView={
                    <PositionView
                        variant="screen"
                        position={position}
                        previousPosition={oldPosition}
                        disabled={disabled}
                    />
                }
                disabled={disabled}
            >
                <Stack direction="row" alignItems="center" spacing={2}>
                    {isNew && isDynamic ? (
                        <Field<string> name={`${name}.title`}>
                            {({ input }) => (
                                <TextField {...input} placeholder="Введите наименование экрана" fullWidth />
                            )}
                        </Field>
                    ) : (
                        <Typography component="h3" variant="h6" sx={{ flexGrow: 1, overflowWrap: 'break-word' }}>
                            {title}
                        </Typography>
                    )}
                    <Stack direction="row" alignItems="center" spacing={0.5}>
                        {disabled && <ActiveStatusChip type={ActiveStates.Disabled} />}
                        {isNew ? (
                            <ChangeStatusChip type={ChangeStates.New} />
                        ) : (
                            <Field<ActiveState, HTMLElement, boolean>
                                type="checkbox"
                                name={`${name}.state`}
                                format={(value) => isActive(value)}
                            >
                                {({ input }) => <Switch {...input} onChange={handleDisableScreen} />}
                            </Field>
                        )}
                    </Stack>
                </Stack>
                {isNew && isDynamic ? (
                    <Field<string> name={`${name}.description`}>
                        {({ input }) => (
                            <TextField {...input} placeholder="Введите описание экрана" multiline rows={3} fullWidth />
                        )}
                    </Field>
                ) : (
                    <Typography sx={{ color: disabled ? 'inherit' : 'text.secondary' }}>{description}</Typography>
                )}

                <Typography>Тип: {screenType.get(type)}</Typography>
                <ScreenFieldsInput name={`${name}.fields`} fields={fields} disabled={disabled} dynamic={isDynamic} />
                {!isDynamic && <AppVersions versions={appVersions} />}
            </Card>
            {isNew ? (
                <IconButton onClick={handleRemoveScreen} sx={{ alignSelf: 'flex-start' }}>
                    <ClearIcon />
                </IconButton>
            ) : (
                <Box sx={{ width: 40 }} />
            )}
        </Stack>
    );
};

export default ScreenInput;
