import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

interface ContentBoxProps {
    title?: string;
    children?: React.ReactNode;
    loading?: boolean;
    disableGutters?: boolean;
    skeletonWidth?: string | number;
    skeletonHeight?: string | number;
}

const ContentBox: React.FC<ContentBoxProps> = ({ title, children, loading, skeletonWidth, skeletonHeight }) => {
    if (loading) {
        return (
            <Box>
                {title && (
                    <Skeleton variant="rounded" width={300}>
                        <Typography component="h2" variant="h5" sx={{ mb: 4 }}>
                            .
                        </Typography>
                    </Skeleton>
                )}
                <Skeleton variant="rounded" height={skeletonHeight} width={skeletonWidth}>
                    {children}
                </Skeleton>
            </Box>
        );
    }

    return (
        <Box>
            {title && (
                <Typography component="h2" variant="h5" sx={{ mb: 4 }}>
                    {title}
                </Typography>
            )}
            {children}
        </Box>
    );
};

export default ContentBox;
