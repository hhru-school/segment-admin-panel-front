import { Outlet, useParams } from 'react-router-dom';
import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import LayerIcon from '@mui/icons-material/LibraryAddOutlined';
import EntryPointIcon from '@mui/icons-material/OpenInNewOutlined';
import FieldsIcon from '@mui/icons-material/QuestionAnswerOutlined';
import GroupFieldsIcon from '@mui/icons-material/QuizOutlined';

import LayerLayout from 'layouts/LayerLayout';

const LayerPage: React.FC = () => {
    const { segmentId, entryPointId, fieldId } = useParams();

    if (segmentId != null || entryPointId != null || fieldId != null) {
        return <Outlet />;
    }

    return (
        <LayerLayout
            drawerOptions={[
                { href: 'info', primaryText: 'Основная информация', icon: <InfoIcon /> },
                { href: 'changes', primaryText: 'Изменения в слое', icon: <LayerIcon /> },
                { href: 'segments', primaryText: 'Сегменты', icon: <SegmentsIcon /> },
                { href: 'entry-points', primaryText: 'Точки входа', icon: <EntryPointIcon /> },
                { href: 'fields', primaryText: 'Поля', icon: <FieldsIcon /> },
                { href: 'field-groups', primaryText: 'Группы полей', icon: <GroupFieldsIcon /> },
            ]}
            title="Водитель за 50"
        >
            <Outlet />
        </LayerLayout>
    );
};

export default LayerPage;
