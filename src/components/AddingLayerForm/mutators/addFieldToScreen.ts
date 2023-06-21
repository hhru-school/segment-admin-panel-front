import { Mutator } from 'final-form';

import { NewLayer, ScreenFieldInputValue, ScreenFieldInputValues } from 'components/AddingLayerForm/types';
import { FieldVisibilityStates, Question } from 'types/field';

const questionToScreenField = ({ id, title }: Question, position: number): ScreenFieldInputValue => {
    return { id, title, position, visibility: FieldVisibilityStates.Hide, isNew: true };
};

const addFieldToScreen: Mutator<NewLayer> = (
    [name, field, position]: [string, Question, number],
    state,
    { changeValue }
) => {
    changeValue(state, name, (value: ScreenFieldInputValues): ScreenFieldInputValues => {
        return { ...value, [`id-${field.id}`]: questionToScreenField(field, position) };
    });
};

export default addFieldToScreen;
