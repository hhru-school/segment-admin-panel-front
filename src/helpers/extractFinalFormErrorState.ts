import { FieldMetaState } from 'react-final-form';

import isMessage from 'helpers/isMessage';

const extractFinalFormErrorState = <T>(meta: FieldMetaState<T>): [boolean, string | null, string | null] => {
    const error = isMessage(meta.error) ? meta.error : null;
    const submitError = isMessage(meta.submitError) ? meta.submitError : null;
    const isError = Boolean((error || submitError) && meta.touched && !meta.dirtySinceLastSubmit);
    return [isError, error, submitError];
};

export default extractFinalFormErrorState;
