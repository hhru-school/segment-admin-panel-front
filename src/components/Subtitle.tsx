import Skeleton, { SkeletonProps } from '@mui/material/Skeleton';
import Typography from '@mui/material/Typography';

interface SubtitleProps {
    variant?: 'h5' | 'h6';
    children?: React.ReactNode;
    loading?: boolean;
    SkeletonProps?: Omit<SkeletonProps, 'children'>;
}

const Subtitle: React.FC<SubtitleProps> = ({ variant = 'h5', children, loading, SkeletonProps }) => {
    return (
        <Typography component="h3" variant={variant} sx={{ pb: 2 }}>
            {loading ? <Skeleton variant="rounded" {...SkeletonProps} /> : children}
        </Typography>
    );
};

export default Subtitle;
