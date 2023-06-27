import { useCallback, useState } from 'react';

import WizardProvider, { useWizard } from 'components/Wizard/WizardContext';

export interface Page {
    name: string;
    element: React.ReactNode;
}

export type Pages<T = string> = Map<T, Page>;

export interface SetPageHandler {
    (name: string, state?: unknown, from?: string): void;
}

export interface SetStateHandler {
    (state?: unknown): void;
}

interface RenderWizardProps {
    state?: unknown;
    activePage?: Page;
    handleSetActivePage: SetPageHandler;
    handleSetState: SetStateHandler;
    previousPage?: string;
}

interface WizardProps {
    state: unknown;
    pages: Pages;
    defaultPage: string;
    children?: ((props: RenderWizardProps) => React.ReactNode) | React.ReactNode;
}

const Wizard: React.FC<WizardProps> = ({ state, pages, defaultPage, children }) => {
    const [activePage, setActivePage] = useState(pages.get(defaultPage));
    const [wizardState, setWizardState] = useState(state);
    const [previousPage, setPreviousPage] = useState<string>();

    const handleSetActivePage: SetPageHandler = useCallback(
        (name, newState) => {
            setPreviousPage(activePage?.name);
            setActivePage(pages.get(name));

            if (newState !== undefined) {
                setWizardState(newState);
            }
        },
        [pages, activePage, setActivePage, setPreviousPage]
    );

    const handleSetState: SetStateHandler = useCallback(
        (newState) => {
            setWizardState(newState);
        },
        [setWizardState]
    );

    return (
        <WizardProvider
            activePage={activePage}
            setActivePageHandler={handleSetActivePage}
            setStateHandler={handleSetState}
            state={wizardState}
            previousPage={previousPage}
        >
            {typeof children === 'function'
                ? children({ activePage, handleSetActivePage, handleSetState, state: wizardState, previousPage })
                : children}
        </WizardProvider>
    );
};

export default Wizard;
export { useWizard };
