import React, { createContext, useContext } from 'react';

import { Page, SetPageHandler, SetStateHandler } from 'components/Wizard';

export interface WizardContextType {
    setStateHandler: SetStateHandler;
    setActivePageHandler: SetPageHandler;
    state?: unknown;
    activePage?: Page;
    previousPage?: string;
}

interface WizardProviderProps {
    setStateHandler: SetStateHandler;
    setActivePageHandler: SetPageHandler;
    state?: unknown;
    activePage?: Page;
    previousPage?: string;
    children?: React.ReactNode;
}

const WizardContext = createContext<WizardContextType>({
    setStateHandler: () => null,
    setActivePageHandler: () => null,
});

const WizardProvider: React.FC<WizardProviderProps> = ({
    activePage,
    setStateHandler,
    setActivePageHandler,
    children,
    state,
    previousPage,
}) => {
    return (
        <WizardContext.Provider value={{ activePage, setStateHandler, setActivePageHandler, state, previousPage }}>
            {children}
        </WizardContext.Provider>
    );
};

const useWizard = (): ReturnType<typeof useContext<WizardContextType>> => useContext(WizardContext);

export default WizardProvider;
export { WizardContext, useWizard };
