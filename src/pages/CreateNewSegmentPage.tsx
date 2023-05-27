import AddingSegmentForm from 'components/AddingSegmentForm';
import FormLayout from 'layouts/FormLayout';

const CreateNewSegmentPage: React.FC = () => {
    return (
        <FormLayout title="Новый сегмент" ContainerProps={{ maxWidth: 'md' }}>
            <AddingSegmentForm />
        </FormLayout>
    );
};

export default CreateNewSegmentPage;
