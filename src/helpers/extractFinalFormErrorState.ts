import { FieldMetaState } from 'react-final-form';

import isMessage from 'helpers/isMessage';

const extractFinalFormErrorState = <T>(meta: FieldMetaState<T>): [boolean, string | null] => {
    const isError = Boolean(isMessage(meta.error) && meta.touched);
    const error = isMessage(meta.error) ? meta.error : null;
    return [isError, error];
};

export default extractFinalFormErrorState;
