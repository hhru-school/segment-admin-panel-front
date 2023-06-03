import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import SearchView from 'components/SearchView';
import TreeItem from 'components/Tree/TreeItem';
import TreeItemLabel from 'components/Tree/TreeItemLabel';
import isEmpty from 'helpers/isEmpty';
import { Answer, Question, isQuestion } from 'types/field';

interface FieldsTreeItemProps {
    field: Question;
    searchString: string;
}

const renderTitle = (node: Question | Answer, searchString: string): React.ReactNode => {
    return node.searchedObject ? (
        <SearchView subString={searchString}>{node.title}</SearchView>
    ) : (
        <Typography>{node.title}</Typography>
    );
};

const getItems = (
    nodeList: Array<Question | Answer>,
    key: string | number,
    searchString: string
): [React.ReactNode, boolean] => {
    const getItem = (node: Question | Answer, key: string | number): [React.ReactNode, boolean] => {
        const uniqueKey = `${key}-${node.id}`;
        const nextNodeList = isQuestion(node) ? node.possibleAnswersList : node.openQuestionList;

        const [nextItems, isExpand] = getItems(nextNodeList, uniqueKey, searchString);

        return [
            <TreeItem
                key={uniqueKey}
                renderLabel={(expand, toggleExpand) => (
                    <TreeItemLabel collapsible={!isEmpty(nextNodeList)} expand={expand} toggleExpand={toggleExpand}>
                        {renderTitle(node, searchString)}
                    </TreeItemLabel>
                )}
                expanded={isExpand}
            >
                {nextItems}
            </TreeItem>,
            isExpand || node.searchedObject,
        ];
    };

    return nodeList.reduce<[React.ReactNode[], boolean]>(
        (acc, node) => {
            const [item, isExpand] = getItem(node, key);
            acc[0].push(item);
            acc[1] = acc[1] || isExpand;
            return acc;
        },
        [[], false]
    );
};

const FieldsTreeItem: React.FC<FieldsTreeItemProps> = ({ field, searchString }) => {
    const [items, isExpand] = getItems(field.possibleAnswersList, field.id, searchString);
    const isCollapsible = !isEmpty(field.possibleAnswersList);

    return (
        <TreeItem
            renderLabel={(expand, toggleExpand) => (
                <TreeItemLabel
                    actionButton={
                        <Link href={`/fields/${field.id}`} underline="hover" variant="body2">
                            Подробнее
                        </Link>
                    }
                    collapsible={isCollapsible}
                    padding={isCollapsible ? 'normal' : 'fitted'}
                    expand={expand}
                    toggleExpand={toggleExpand}
                >
                    {renderTitle(field, searchString)}
                </TreeItemLabel>
            )}
            expanded={isExpand}
        >
            {items}
        </TreeItem>
    );
};

export default FieldsTreeItem;
