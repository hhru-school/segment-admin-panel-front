import { useCallback, useState } from 'react';

import WizardProvider, { useWizard } from 'components/Wizard/WizardContext';

export interface Page {
    title: string;
    element: React.ReactNode;
}

export type Pages<T = string> = Map<T, Page>;

interface RenderWizardProps {
    activePage?: Page;
    handleSetPage: (name: string) => void;
}

interface WizardProps {
    pages: Pages;
    defaultPage: string;
    children?: ((props: RenderWizardProps) => React.ReactNode) | React.ReactNode;
}

const Wizard: React.FC<WizardProps> = ({ pages, defaultPage, children }) => {
    const [activePage, setActivePage] = useState(pages.get(defaultPage));

    const handleSetPage = useCallback(
        (name: string) => {
            setActivePage(pages.get(name));
        },
        [pages, setActivePage]
    );

    return (
        <WizardProvider activePage={activePage} setPageHandler={handleSetPage}>
            {typeof children === 'function' ? children({ activePage, handleSetPage }) : children}
        </WizardProvider>
    );
};

export default Wizard;
export { useWizard };
