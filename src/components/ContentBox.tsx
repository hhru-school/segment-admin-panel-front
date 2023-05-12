import Box from '@mui/material/Box';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';
import { SxProps, Theme } from '@mui/material/styles';

interface ContentBoxProps {
    loading?: boolean;
    children?: React.ReactNode;
    SkeletonProps?: Omit<SkeletonProps, 'children'>;
    sx?: SxProps<Theme>;
}

const ContentBox: React.FC<ContentBoxProps> = ({ children, loading, sx = {}, SkeletonProps }) => {
    return (
        <Box sx={{ pb: 3, ...sx }}>
            {loading ? (
                <Skeleton variant="rounded" {...SkeletonProps}>
                    {children}
                </Skeleton>
            ) : (
                children
            )}
        </Box>
    );
};

export default ContentBox;
