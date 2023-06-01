import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { VersionsList, Platform } from 'types/version';

interface ScreenAppVersionsProps {
    versions: VersionsList;
    filtered?: boolean;
}

const StyledList = styled(List)(({ theme }) => ({
    padding: '4px 0',
    minHeight: 68,
    borderRadius: '4px',
    backgroundColor: theme.palette.grey[100],
}));

const platformName = new Map<Platform, string>([
    ['WEB', 'Web'],
    ['ANDROID', 'Android'],
    ['IOS', 'iOS'],
]);

const ScreenAppVersions: React.FC<ScreenAppVersionsProps> = ({ versions }) => {
    return (
        <StyledList>
            {versions.map(({ id, platform, version }) => (
                <ListItem key={id} sx={{ py: 0 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="body2">{platformName.get(platform)}</Typography>
                        {platform !== 'WEB' && <Typography variant="body2">{version}</Typography>}
                    </Stack>
                </ListItem>
            ))}
        </StyledList>
    );
};

export default ScreenAppVersions;
