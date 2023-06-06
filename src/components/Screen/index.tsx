import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { lighten, styled } from '@mui/material/styles';

import AppVersions from 'components/AppVersions';
import { FieldsList } from 'types/field';
import { ScreenType, ScreenTypes } from 'types/screen';
import { VersionsList } from 'types/version';

import ScreenFieldsList from 'components/Screen/ScreenFieldsList';

export interface ScreenProps {
    title: string;
    fields: FieldsList;
    appVersions: VersionsList;
    variant?: ScreenType;
    filtered?: boolean;
}

const ScreenCard = styled(Stack, { shouldForwardProp: (prop) => prop !== 'variant' && prop !== 'filtered' })<
    Pick<ScreenProps, 'variant' | 'filtered'>
>(({ theme, variant = ScreenTypes.Static, filtered }) => ({
    height: '100%',
    minHeight: '320px',
    padding: '16px 8px 8px',
    borderRadius: '4px',
    ...(variant === ScreenTypes.Static && { backgroundColor: lighten(theme.palette.secondary.light, 0.5) }),
    ...(variant === ScreenTypes.Dynamic && { backgroundColor: lighten(theme.palette.primary.light, 0.5) }),
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
                <AppVersions versions={appVersions} />
            </Stack>
        </ScreenCard>
    );
};

export default Screen;
