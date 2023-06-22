import { useForm } from 'react-final-form';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getIn } from 'final-form';

import AccordionItem from 'components/AccordionItem';
import { PageName } from 'components/AddingLayerForm';
import getNewDynamicScreen from 'components/AddingLayerForm/helpers/getNewDynamicScreen';
import { EntryPointInputValues, NewLayer, PagesState, isPagesState } from 'components/AddingLayerForm/types';
import { useWizard } from 'components/Wizard';
import idMapToArray from 'helpers/idMapToArray';

import EntryPointInput from 'components/AddingLayerForm/fields/EntryPointInput';

const EntryPointsInput: React.FC = () => {
    const { setPageHandler, state } = useWizard();

    if (!isPagesState(state) || state.segment === null) {
        throw new Error('Не задан сегмент.');
    }

    const { segment } = state;
    const name = `segments.id-${segment.id}.entryPoints`;
    const form = useForm<NewLayer>();
    const { values } = form.getState();
    const entryPoints = getIn(values, name) as EntryPointInputValues;

    const handelSetAddScreensPage = (id: number | string) => {
        const pagesState: PagesState = {
            ...state,
            entryPoint: entryPoints[`id-${id}`],
            newDynamicScreen: getNewDynamicScreen(),
        };

        setPageHandler(PageName.Screens, pagesState);
    };

    return (
        <>
            {idMapToArray(entryPoints).map(({ id, title, description }) => (
                <AccordionItem
                    key={id}
                    title={title}
                    description={
                        <Stack
                            direction="row"
                            alignSelf="flex-start"
                            alignItems="center"
                            spacing={2}
                            sx={{ width: '100%' }}
                        >
                            <Typography sx={{ flexGrow: 1, color: 'text.secondary', textIndent: 32 }}>
                                {description}
                            </Typography>
                            <Button onClick={() => handelSetAddScreensPage(id)} variant="outlined">
                                Добавить экран
                            </Button>
                        </Stack>
                    }
                >
                    <EntryPointInput name={`${name}.id-${id}`} />
                </AccordionItem>
            ))}
        </>
    );
};

export default EntryPointsInput;
