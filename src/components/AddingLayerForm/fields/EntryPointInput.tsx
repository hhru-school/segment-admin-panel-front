import { useState } from 'react';
import { useForm } from 'react-final-form';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import { getIn } from 'final-form';

import { ScreenInputValues } from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';
import isEmpty from 'helpers/isEmpty';

import ScreenInput from 'components/AddingLayerForm/fields/ScreenInput';

interface EntryPointInputProps {
    name: string;
}

const EntryPointInput: React.FC<EntryPointInputProps> = ({ name }) => {
    const form = useForm();
    const { values } = form.getState();
    const screens = getIn(values, `${name}.screens`) as ScreenInputValues;
    const [, renderEntryPoint] = useState<number>(0);

    if (isEmpty(screens)) {
        return (
            <Alert severity="info" sx={{ width: '100%', justifyContent: 'center', my: 1 }}>
                Нет ни одного экрана.
            </Alert>
        );
    }

    const forceRender = () => {
        renderEntryPoint(Math.random());
    };

    return (
        <>
            {idMapToArray(screens).map((screen) => (
                <Box key={screen.id} width={650}>
                    <ScreenInput
                        name={`${name}.screens.id-${screen.id}`}
                        screen={screen}
                        forceRenderParent={forceRender}
                    />
                </Box>
            ))}
        </>
    );
};

export default EntryPointInput;
