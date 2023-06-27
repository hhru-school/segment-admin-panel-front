import { useMemo } from 'react';
import Alert from '@mui/material/Alert';

import { EntryPointInputValues } from 'components/AddingLayerForm/types';
import idMapToArray from 'helpers/idMapToArray';
import isEmpty from 'helpers/isEmpty';

import EntryPointInput from 'components/AddingLayerForm/fields/EntryPointInput';

interface EntryPointsInputProps {
    name: string;
    entryPoints: EntryPointInputValues;
}

const EntryPointsInput: React.FC<EntryPointsInputProps> = ({ name, entryPoints }) => {
    const entryPointsName = `${name}.entryPoints`;
    const entryPointsArray = useMemo(() => idMapToArray(entryPoints), [entryPoints]);

    if (isEmpty(entryPointsArray)) {
        return (
            <Alert severity="info" sx={{ width: '100%', justifyContent: 'center', my: 1 }}>
                Нет ни одной точки входа.
            </Alert>
        );
    }

    return (
        <>
            {entryPointsArray.map(({ id }) => (
                <EntryPointInput key={id} name={`${entryPointsName}.id-${id}`} />
            ))}
        </>
    );
};

export default EntryPointsInput;
