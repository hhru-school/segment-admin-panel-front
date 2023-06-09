import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { VersionsList, Platform, Platforms } from 'types/version';

interface AppVersionsProps {
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
    [Platforms.Web, 'Web'],
    [Platforms.Android, 'Android'],
    [Platforms.IOs, 'iOS'],
]);

const AppVersions: React.FC<AppVersionsProps> = ({ versions }) => {
    return (
        <StyledList>
            {versions.map(({ id, platform, version }) => (
                <ListItem key={id} sx={{ py: 0 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="body2">{platformName.get(platform)}</Typography>
                        {platform !== Platforms.Web && <Typography variant="body2">{version}</Typography>}
                    </Stack>
                </ListItem>
            ))}
        </StyledList>
    );
};

export default AppVersions;
