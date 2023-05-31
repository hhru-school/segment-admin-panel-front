import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { lighten, styled } from '@mui/material/styles';

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
    minHeight: '320px',
    padding: '16px 8px 8px',
    borderRadius: '4px',
    ...(variant === Variant.STATIC && { backgroundColor: lighten(theme.palette.secondary.light, 0.5) }),
    ...(variant === Variant.DYNAMIC && { backgroundColor: lighten(theme.palette.primary.light, 0.5) }),
    ...(filtered && {
        color: theme.palette.text.disabled,
        backgroundColor: theme.palette.grey[300],
        filter: 'grayscale(1)',
    }),
}));

const Screen: React.FC<ScreenProps> = ({ title, fields, appVersions, variant, filtered }) => {
    return (
        <ScreenCard variant={variant} filtered={filtered}>
            <Typography
                component="h3"
                sx={{
                    height: 41,
                    overflowWrap: 'break-word',
                    overflowY: 'auto',
                    fontWeight: 700,
                    textAlign: 'center',
                }}
                variant="body2"
            >
                {title}
            </Typography>
            <Stack justifyContent="space-between" flexGrow={1} spacing={2}>
                <ScreenFieldsList variant={variant} fields={fields} />
                <ScreenAppVersions versions={appVersions} />
            </Stack>
        </ScreenCard>
    );
};

export default Screen;
