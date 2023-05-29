import Button from '@mui/material/Button';

import SearchView from 'components/SearchView';
import TreeItem from 'components/Tree/TreeItem';
import TreeItemLabel from 'components/Tree/TreeItemLabel';
import isEmpty from 'helpers/isEmpty';
import { Answer, Question, isQuestion } from 'models/fields';

interface FieldsTreeItemProps {
    field: Question;
    searchString: string;
}

const FieldsTreeItem: React.FC<FieldsTreeItemProps> = ({ field, searchString }) => {
    let uniqueKey: string | number = field.id;
    let isFound = isEmpty(searchString) || field.searchedObject;

    const render = (node: Question | Answer): JSX.Element => {
        isFound = isFound || node.searchedObject;
        uniqueKey = `${uniqueKey}-${node.id}`;
        const nextNodeList = isQuestion(node) ? node.answerDtoList : node.openQuestonDtoList;

        return (
            <TreeItem
                key={uniqueKey}
                renderLabel={(expand, toggleExpand) => (
                    <TreeItemLabel collapsible={!isEmpty(nextNodeList)} expand={expand} toggleExpand={toggleExpand}>
                        {node.searchedObject ? (
                            <SearchView subString={searchString}>{field.title}</SearchView>
                        ) : (
                            node.title
                        )}
                    </TreeItemLabel>
                )}
                expanded={!isFound}
            >
                {nextNodeList.map(render)}
            </TreeItem>
        );
    };

    return (
        <TreeItem
            renderLabel={(expand, toggleExpand) => (
                <TreeItemLabel
                    actionButton={
                        <Button href={field.id.toString()} size="small">
                            Подробнее
                        </Button>
                    }
                    collapsible={!isEmpty(field.answerDtoList)}
                    expand={expand}
                    toggleExpand={toggleExpand}
                >
                    {field.searchedObject ? (
                        <SearchView subString={searchString}>{field.title}</SearchView>
                    ) : (
                        field.title
                    )}
                </TreeItemLabel>
            )}
            expanded={!isFound}
        >
            {field.answerDtoList.map(render)}
        </TreeItem>
    );
};

export default FieldsTreeItem;
