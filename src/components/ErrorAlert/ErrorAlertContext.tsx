import React, { createContext, useCallback, useEffect, useState } from 'react';

const ALERT_TIME = 10000;

export interface ErrorAlertContextType {
    message: string | null;
    setAlert: (message: string) => void;
    isShow: boolean;
    hide: () => void;
}

interface ErrorAlertProviderProps {
    children: React.ReactNode;
}

const ErrorAlertContext = createContext<ErrorAlertContextType>({
    message: null,
    setAlert: () => null,
    isShow: false,
    hide: () => null,
});

const ErrorAlertProvider: React.FC<ErrorAlertProviderProps> = ({ children }) => {
    const [message, setMessage] = useState('');
    const [isShow, setIsShow] = useState(false);

    const setAlert = useCallback(
        (message: string) => {
            setMessage(message);
            setIsShow(true);
        },
        [setMessage]
    );

    const hide = useCallback(() => {
        setIsShow(false);
    }, [setIsShow]);

    useEffect(() => {
        let timer: ReturnType<typeof setTimeout>;

        if (isShow) {
            timer = setTimeout(() => {
                setIsShow(false);
            }, ALERT_TIME);
        }

        return () => clearTimeout(timer);
    }, [isShow]);

    return (
        <ErrorAlertContext.Provider
            value={{
                message,
                setAlert,
                isShow,
                hide,
            }}
        >
            {children}
        </ErrorAlertContext.Provider>
    );
};

export default ErrorAlertProvider;
export { ErrorAlertContext };
