import React, { createContext, useContext } from 'react';

import { Page, SetPageHandler, SetStateHandler } from 'components/Wizard';

export interface WizardContextType {
    setStateHandler: SetStateHandler;
    setPageHandler: SetPageHandler;
    state?: unknown;
    activePage?: Page;
    from?: string;
}

interface WizardProviderProps {
    setStateHandler: SetStateHandler;
    setPageHandler: SetPageHandler;
    state?: unknown;
    activePage?: Page;
    from?: string;
    children?: React.ReactNode;
}

const WizardContext = createContext<WizardContextType>({
    setStateHandler: () => null,
    setPageHandler: () => null,
});

const WizardProvider: React.FC<WizardProviderProps> = ({
    activePage,
    setStateHandler,
    setPageHandler,
    children,
    state,
    from,
}) => {
    return (
        <WizardContext.Provider value={{ activePage, setStateHandler, setPageHandler, state, from }}>
            {children}
        </WizardContext.Provider>
    );
};

const useWizard = (): ReturnType<typeof useContext<WizardContextType>> => useContext(WizardContext);

export default WizardProvider;
export { WizardContext, useWizard };
