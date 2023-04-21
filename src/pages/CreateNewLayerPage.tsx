import SegmentsIcon from '@mui/icons-material/DonutSmallOutlined';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import LayerIcon from '@mui/icons-material/LibraryAddOutlined';
import EntryPointIcon from '@mui/icons-material/OpenInNewOutlined';
import FieldsIcon from '@mui/icons-material/QuestionAnswerOutlined';
import GroupFieldsIcon from '@mui/icons-material/QuizOutlined';

import LayerLayout from 'layouts/LayerLayout';

import UnderConstructionPage from 'pages/UnderConstructionPage';

const CreateNewLayerPage: React.FC = () => {
    return (
        <LayerLayout
            drawerOptions={[
                { href: '#', primaryText: 'Основная информация', icon: <InfoIcon /> },
                { href: '#', primaryText: 'Изменения в слое', icon: <LayerIcon /> },
                { href: '#', primaryText: 'Сегменты', icon: <SegmentsIcon /> },
                { href: '#', primaryText: 'Точки входа', icon: <EntryPointIcon /> },
                { href: '#', primaryText: 'Поля', icon: <FieldsIcon /> },
                { href: '#', primaryText: 'Группы полей', icon: <GroupFieldsIcon /> },
            ]}
            title="Новый слой"
        >
            <UnderConstructionPage pageName="Создание нового слоя" />
        </LayerLayout>
    );
};

export default CreateNewLayerPage;
