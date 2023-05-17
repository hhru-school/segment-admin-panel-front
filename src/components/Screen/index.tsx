import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { FieldsList, VersionsList } from 'models/screens';

import ScreenAppVersions from 'components/Screen/ScreenAppVersions';
import ScreenFieldsList from 'components/Screen/ScreenFieldsList';

export const enum Variant {
    STATIC = 'static',
    DYNAMIC = 'dynamic',
}

export interface ScreenProps {
    title: string;
    fields: FieldsList;
    appVersions: VersionsList;
    variant?: `${Variant}`;
    filtered?: boolean;
}

const ScreenCard = styled(Stack, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'filtered' })<
    Pick<ScreenProps, 'variant' | 'filtered'>
>(({ theme, variant = Variant.STATIC, filtered }) => ({
    height: '100%',
    minHeight: '280px',
    width: '200px',
    padding: '16px 8px 8px',
    borderRadius: '4px',
    ...(variant === Variant.STATIC && { backgroundColor: '#ffd1d1' }),
    ...(variant === Variant.DYNAMIC && { backgroundColor: '#75ade4' }),
    ...(filtered && { color: theme.palette.text.disabled, backgroundColor: '#cccccc', filter: 'grayscale(1)' }),
}));

const Screen: React.FC<ScreenProps> = ({ title, fields, appVersions, variant, filtered }) => {
    return (
        <ScreenCard variant={variant} filtered={filtered}>
            <Typography sx={{ fontWeight: '700', textAlign: 'center' }}>{title}</Typography>
            <Stack justifyContent="space-between" flexGrow={1}>
                <ScreenFieldsList variant={variant} fields={fields} />
                <ScreenAppVersions versions={appVersions} />
            </Stack>
        </ScreenCard>
    );
};

export default Screen;
