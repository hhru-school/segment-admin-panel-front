import React, { createContext, useCallback, useState } from 'react';

export interface TreeItemContextType {
    expand: boolean;
    toggleExpand: () => void;
}

interface TreeItemProviderProps {
    children: React.ReactNode;
    expanded?: boolean;
}

const TreeItemContext = createContext<TreeItemContextType>({
    expand: false,
    toggleExpand: () => null,
});

const TreeItemProvider: React.FC<TreeItemProviderProps> = ({ children, expanded = false }) => {
    const [expand, setExpand] = useState(expanded);

    const handleToggleExpand = useCallback(() => {
        setExpand(!expand);
    }, [expand, setExpand]);

    return (
        <TreeItemContext.Provider
            value={{
                expand,
                toggleExpand: handleToggleExpand,
            }}
        >
            {children}
        </TreeItemContext.Provider>
    );
};

export default TreeItemProvider;
export { TreeItemContext };
