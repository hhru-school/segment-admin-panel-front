import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import { VersionsList } from 'models/screens';

interface ScreenAppVersionsProps {
    versions: VersionsList;
    filtered?: boolean;
}

const StyledList = styled(List)({
    padding: '4px 0',
    borderRadius: '4px',
    backgroundColor: '#dee3e9',
});

const ScreenAppVersions: React.FC<ScreenAppVersionsProps> = ({ versions }) => {
    return (
        <StyledList>
            {versions.map(({ id, platform, version }) => (
                <ListItem key={id} sx={{ py: 0 }}>
                    <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                        <Typography variant="body2">{platform}</Typography>
                        <Typography variant="body2">{version}</Typography>
                    </Stack>
                </ListItem>
            ))}
        </StyledList>
    );
};

export default ScreenAppVersions;