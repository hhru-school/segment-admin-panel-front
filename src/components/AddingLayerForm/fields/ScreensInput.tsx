import { Field, FieldRenderProps } from 'react-final-form';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';

import { ScreenInputValue, ScreenInputValues, isPagesState } from 'components/AddingLayerForm/types';
import Screen from 'components/Screen';
import { useWizard } from 'components/Wizard';
import idMapToArray from 'helpers/idMapToArray';

interface ScreensInputProps extends FieldRenderProps<ScreenInputValues> {
    options: ScreenInputValue[];
}

const ScreensInput: React.FC<ScreensInputProps> = ({ input, options }) => {
    const { name } = input;
    const { state } = useWizard();

    if (!isPagesState(state) || state.newDynamicScreen === null) {
        throw new Error('Незадан новый динамический экран.');
    }
    const { newDynamicScreen } = state;

    return (
        <Grid
            container
            rowSpacing={{ xs: 2, sm: 4 }}
            columnSpacing={4}
            justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
            {options.map((screen) => {
                const { id, title, type, fields, appVersions } = screen;
                return (
                    <Grid key={id} item xs={12} sm={6} md={4} lg={4}>
                        <Stack direction="row" sx={{ height: '100%' }}>
                            <Field<ScreenInputValue | undefined, HTMLElement, boolean>
                                type="checkbox"
                                name={`${name}.id-${id}`}
                                format={(value) => value !== undefined}
                                parse={(checked) => (checked ? screen : undefined)}
                            >
                                {({ input }) => <Checkbox {...input} sx={{ alignSelf: 'flex-start' }} />}
                            </Field>
                            <Screen
                                title={title}
                                fields={idMapToArray(fields)}
                                appVersions={appVersions}
                                variant={type}
                            />
                        </Stack>
                    </Grid>
                );
            })}
            <Grid item xs={12} sm={6} md={4} lg={4}>
                <Stack direction="row" sx={{ height: '100%' }}>
                    <Field<ScreenInputValue | undefined, HTMLElement, boolean>
                        type="checkbox"
                        name={`${name}.id-${newDynamicScreen.id}`}
                        format={(value) => value !== undefined}
                        parse={(checked) => (checked ? newDynamicScreen : undefined)}
                    >
                        {({ input }) => <Checkbox {...input} sx={{ alignSelf: 'flex-start' }} />}
                    </Field>
                    <Screen
                        title={newDynamicScreen.title}
                        fields={[]}
                        appVersions={newDynamicScreen.appVersions}
                        variant={newDynamicScreen.type}
                    />
                </Stack>
            </Grid>
        </Grid>
    );
};

export default ScreensInput;
