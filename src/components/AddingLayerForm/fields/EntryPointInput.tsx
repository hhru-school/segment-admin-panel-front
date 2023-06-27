import { useMemo } from 'react';
import { useField } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import AccordionItem from 'components/AccordionItem';
import { PageName } from 'components/AddingLayerForm';
import getNewDynamicScreen from 'components/AddingLayerForm/helpers/getNewDynamicScreen';
import { PagesState, isPagesState, EntryPointInputValue } from 'components/AddingLayerForm/types';
import { useWizard } from 'components/Wizard';
import idMapToArray from 'helpers/idMapToArray';
import isEmpty from 'helpers/isEmpty';

import ScreenInput from 'components/AddingLayerForm/fields/ScreenInput';

interface EntryPointInputProps {
    name: string;
}

const EntryPointInput: React.FC<EntryPointInputProps> = ({ name }) => {
    const { setActivePageHandler, state } = useWizard();

    if (!isPagesState(state)) {
        throw new Error('Не задано предыдущее значение состояния.');
    }

    const {
        input: { value: entryPoint },
    } = useField<EntryPointInputValue>(name, { subscription: { value: true } });
    const { title, description, screens } = entryPoint;
    const screensArray = useMemo(() => idMapToArray(screens), [screens]);

    const handelSetAddScreensPage = () => {
        const pagesState: PagesState = {
            ...state,
            entryPoint,
            newDynamicScreen: getNewDynamicScreen(),
        };

        setActivePageHandler(PageName.Screens, pagesState);
    };

    return (
        <AccordionItem
            title={title}
            description={
                <Stack direction="row" alignSelf="flex-start" alignItems="center" spacing={2} sx={{ width: '100%' }}>
                    <Typography sx={{ flexGrow: 1, color: 'text.secondary', textIndent: 32 }}>{description}</Typography>
                    <Button onClick={handelSetAddScreensPage} variant="outlined">
                        Добавить экран
                    </Button>
                </Stack>
            }
        >
            {isEmpty(screensArray) ? (
                <Alert severity="info" sx={{ width: '100%', justifyContent: 'center', my: 1 }}>
                    Нет ни одного экрана.
                </Alert>
            ) : (
                screensArray.map((screen) => (
                    <Box key={screen.id} width={650}>
                        <ScreenInput name={`${name}.screens.id-${screen.id}`} screen={screen} />
                    </Box>
                ))
            )}
        </AccordionItem>
    );
};

export default EntryPointInput;
