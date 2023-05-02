import Box from '@mui/material/Box';
import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';

interface ContentBoxProps {
    itemsGap?: number;
    loading?: boolean;
    children?: React.ReactNode;
    SkeletonProps?: Omit<SkeletonProps, 'children'>;
}

const ContentBox: React.FC<ContentBoxProps> = ({ itemsGap = 1, children, loading, SkeletonProps }) => {
    return (
        <Box sx={{ pb: 3, '> :not(:last-child)': { mb: itemsGap } }}>
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
