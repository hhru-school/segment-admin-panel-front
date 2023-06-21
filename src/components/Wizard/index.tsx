import { useCallback, useRef, useState } from 'react';

import WizardProvider, { useWizard } from 'components/Wizard/WizardContext';

export interface Page {
    name: string;
    element: React.ReactNode;
}

export type Pages<T = string> = Map<T, Page>;

export interface SetPageHandler {
    (name: string, state?: unknown): void;
}

interface RenderWizardProps {
    state?: unknown;
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
    const state = useRef<unknown | undefined>();

    const handleSetPage: SetPageHandler = useCallback(
        (name, newState) => {
            setActivePage(pages.get(name));
            if (newState !== undefined) {
                state.current = newState;
            }
        },
        [pages, setActivePage]
    );

    return (
        <WizardProvider activePage={activePage} setPageHandler={handleSetPage} state={state.current}>
            {typeof children === 'function' ? children({ activePage, handleSetPage, state: state.current }) : children}
        </WizardProvider>
    );
};

export default Wizard;
export { useWizard };
