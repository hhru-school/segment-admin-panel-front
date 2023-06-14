import React, { createContext, useContext } from 'react';

import { Page } from 'components/Wizard';

export interface WizardContextType {
    activePage?: Page;
    setPageHandler: (name: string) => void;
}

interface WizardProviderProps {
    activePage?: Page;
    setPageHandler: (name: string) => void;
    children?: React.ReactNode;
}

const WizardContext = createContext<WizardContextType>({
    setPageHandler: () => null,
});

const WizardProvider: React.FC<WizardProviderProps> = ({ activePage, setPageHandler, children }) => {
    return <WizardContext.Provider value={{ activePage, setPageHandler }}>{children}</WizardContext.Provider>;
};

const useWizard = (): ReturnType<typeof useContext<WizardContextType>> => useContext(WizardContext);

export default WizardProvider;
export { WizardContext, useWizard };
