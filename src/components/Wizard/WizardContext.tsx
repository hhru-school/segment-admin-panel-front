import React, { createContext, useContext } from 'react';

import { Page, State, SetPageHandler } from 'components/Wizard';

export interface WizardContextType {
    setPageHandler: SetPageHandler;
    state?: State;
    activePage?: Page;
}

interface WizardProviderProps {
    setPageHandler: SetPageHandler;
    state?: State;
    activePage?: Page;
    children?: React.ReactNode;
}

const WizardContext = createContext<WizardContextType>({
    setPageHandler: () => null,
});

const WizardProvider: React.FC<WizardProviderProps> = ({ activePage, setPageHandler, children, state }) => {
    return <WizardContext.Provider value={{ activePage, setPageHandler, state }}>{children}</WizardContext.Provider>;
};

const useWizard = (): ReturnType<typeof useContext<WizardContextType>> => useContext(WizardContext);

export default WizardProvider;
export { WizardContext, useWizard };
