import { useCallback, useState } from 'react';

import WizardProvider, { useWizard } from 'components/Wizard/WizardContext';

export interface Page {
    title: string;
    element: React.ReactNode;
}

export type Pages<T = string> = Map<T, Page>;

export interface State {
    [key: string]: unknown;
}

export interface SetPageHandler {
    (name: string, state?: State): void;
}

interface RenderWizardProps {
    state?: State;
    activePage?: Page;
    handleSetPage: SetPageHandler;
}

interface WizardProps {
    pages: Pages;
    defaultPage: string;
    children?: ((props: RenderWizardProps) => React.ReactNode) | React.ReactNode;
}

const Wizard: React.FC<WizardProps> = ({ pages, defaultPage, children }) => {
    const [activePage, setActivePage] = useState(pages.get(defaultPage));
    const [state, setState] = useState<State | undefined>();

    const handleSetPage: SetPageHandler = useCallback(
        (name, state) => {
            setActivePage(pages.get(name));
            setState(state);
        },
        [pages, setActivePage]
    );

    return (
        <WizardProvider activePage={activePage} setPageHandler={handleSetPage} state={state}>
            {typeof children === 'function' ? children({ activePage, handleSetPage, state }) : children}
        </WizardProvider>
    );
};

export default Wizard;
export { useWizard };
