import { useFormState } from 'react-final-form';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { getIn } from 'final-form';

import { SegmentInputValue } from 'components/AddingLayerForm/types';
import ContentBox from 'components/ContentBox';
import LightenChip from 'components/LightenChip';

import EntryPointsInput from 'components/AddingLayerForm/fields/EntryPointsInput';
import SegmentFieldsInput from 'components/AddingLayerForm/fields/SegmentFieldsInput';

interface SegmentInputProps {
    name: string;
    loading?: boolean;
}

const SegmentInput: React.FC<SegmentInputProps> = ({ name, loading }) => {
    const { values } = useFormState();
    const segment = getIn(values, `segments.${name}`) as SegmentInputValue;

    if (!segment) {
        throw new Error('Сегмент не задан.');
    }

    const { description, roles, tags } = segment;

    if (loading) {
        return (
            <Stack spacing={4} sx={{ mb: 4 }}>
                <ContentBox title="Описание" loading skeletonWidth="100%">
                    <Typography>.</Typography>
                </ContentBox>
                <ContentBox title="Родительский сегмент" loading skeletonWidth="100%">
                    <Typography>.</Typography>
                </ContentBox>
                <ContentBox title="Роли" loading skeletonWidth="100%">
                    <LightenChip />
                </ContentBox>
                <ContentBox title="Теги" loading skeletonWidth="100%">
                    <LightenChip />
                </ContentBox>
                <ContentBox title="Пля" loading skeletonHeight={65 * 4} skeletonWidth="100%" />
                <ContentBox title="Точки входа" loading skeletonHeight={65} skeletonWidth="100%" />
            </Stack>
        );
    }

    return (
        <Stack spacing={4} sx={{ mb: 4 }}>
            <ContentBox title="Описание">
                <Typography sx={{ textIndent: 32 }}>{description}</Typography>
            </ContentBox>
            <ContentBox title="Роли">
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {roles.map(({ id, name }) => (
                        <LightenChip key={id} label={name} color="primary" />
                    ))}
                </Stack>
            </ContentBox>
            <ContentBox title="Теги">
                <Stack direction="row" spacing={3} flexWrap="wrap">
                    {tags.map((name) => (
                        <LightenChip key={name} label={name} color="secondary" />
                    ))}
                </Stack>
            </ContentBox>
            <ContentBox title="Поля" smallGutters>
                <SegmentFieldsInput />
            </ContentBox>
            <ContentBox title="Точки входа" smallGutters>
                <EntryPointsInput />
            </ContentBox>
        </Stack>
    );
};

export default SegmentInput;
