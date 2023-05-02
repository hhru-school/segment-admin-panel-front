import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';

import QuestionRequiredElement from 'components/QuestionStatus/QuestionRequiredElement';
import TableCollapsedDataRow, { DataConverter } from 'components/Table/TableCollapsedDataRow';
import TableHead, { Column } from 'components/Table/TableHead';
import exhaustiveCheck from 'helpers/exhaustiveCheck';
import { Link, QuestionVisibilityStatus } from 'models/layerChanges';

import QuestionVisibilityTable from 'components/QuestionTable/QuestionVisibilityTable';

interface QuestionVisibility {
    title: string;
    visibilityStatus: QuestionVisibilityStatus;
}

interface QuestionLink {
    title: string;
    required: boolean;
    visibility: QuestionVisibility[];
}

interface QuestionLinkMap {
    [key: string]: QuestionLink;
}

const convertLinkToQuestion = (link: Link): QuestionLink => {
    return {
        title: link.questionTitle,
        required: link.questionRequired,
        visibility: [{ title: link.entrypointTitle, visibilityStatus: link.questionVisibility }],
    };
};

const reduceToQuestionLinkMap = (questionMap: QuestionLinkMap, link: Link): QuestionLinkMap => {
    if (questionMap[link.questionTitle] === undefined) {
        questionMap[link.questionTitle] = convertLinkToQuestion(link);
    } else {
        questionMap[link.questionTitle].visibility.push({
            title: link.entrypointTitle,
            visibilityStatus: link.questionVisibility,
        });
    }
    return questionMap;
};

const columns: Column<QuestionLink, 'empty'>[] = [
    { key: 'title', headerName: 'Наименование' },
    { key: 'required', headerName: 'Обязательность', align: 'center', width: 142 },
];

const createRows = (links: Link[]): QuestionLink[] => {
    const questionMap: QuestionLinkMap = links.reduce(reduceToQuestionLinkMap, {});
    return Object.keys(questionMap).map((key) => questionMap[key]);
};

const convertData: DataConverter<QuestionLink> = (key, data) => {
    switch (key) {
        case 'required':
            return <QuestionRequiredElement required={data[key]} changed={!data[key]} />;
        case 'title':
            return data.title;
        case 'visibility':
            return null;
    }
    return exhaustiveCheck(key);
};

interface QuestionTableProps {
    items: Link[];
}

const QuestionTable: React.FC<QuestionTableProps> = ({ items }) => {
    const rows = createRows(items);
    return (
        <Table size="small">
            <TableHead columns={[{ key: 'empty', width: '1%' }, ...columns]} />
            <TableBody>
                {rows.map((row) => (
                    <TableCollapsedDataRow key={row.title} columns={columns} row={row} dataConverter={convertData}>
                        <QuestionVisibilityTable rows={row.visibility} />
                    </TableCollapsedDataRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default QuestionTable;
