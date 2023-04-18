import { useContext } from 'react';

import { ErrorAlertContext, ErrorAlertContextType } from 'components/ErrorAlert/ErrorAlertContext';

const useErrorAlert = (): ReturnType<typeof useContext<ErrorAlertContextType>> => useContext(ErrorAlertContext);

export default useErrorAlert;
