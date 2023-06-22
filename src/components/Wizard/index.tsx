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
    handleSetPage: SetPageHandler;
    handleSetState: SetStateHandler;
    from?: string;
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
    const [from, setFrom] = useState<string>();

    const handleSetPage: SetPageHandler = useCallback(
        (name, newState) => {
            setFrom(activePage?.name);
            setActivePage(pages.get(name));

            if (newState !== undefined) {
                setWizardState(newState);
            }
        },
        [pages, activePage, setActivePage, setFrom]
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
            setPageHandler={handleSetPage}
            setStateHandler={handleSetState}
            state={wizardState}
            from={from}
        >
            {typeof children === 'function'
                ? children({ activePage, handleSetPage, handleSetState, state: wizardState, from })
                : children}
        </WizardProvider>
    );
};

export default Wizard;
export { useWizard };
