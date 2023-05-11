import { useContext } from 'react';

import { TreeItemContext, TreeItemContextType } from 'components/Tree/TreeItemContext';

const useTreeItemContext = (): ReturnType<typeof useContext<TreeItemContextType>> => useContext(TreeItemContext);

export default useTreeItemContext;
