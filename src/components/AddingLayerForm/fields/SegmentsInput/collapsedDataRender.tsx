import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { SegmentInputValue } from 'components/AddingLayerForm/types';
import LightenChip from 'components/LightenChip';

const collapsedDataRender = (item: SegmentInputValue): React.ReactNode => (
    <Stack spacing={2}>
        <Typography variant="subtitle2">Роли</Typography>
        <Stack direction="row" spacing={2}>
            {item.roles.map(({ id, name }) => (
                <LightenChip key={id} label={name} color={'primary'} />
            ))}
        </Stack>
        <Typography variant="subtitle2">Теги</Typography>
        <Stack direction="row" spacing={2}>
            {item.tags.map((name) => (
                <LightenChip key={name} label={name} color={'secondary'} />
            ))}
        </Stack>
    </Stack>
);

export default collapsedDataRender;
