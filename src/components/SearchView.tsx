import Typography, { TypographyProps } from '@mui/material/Typography';

interface SearchViewProps extends Omit<TypographyProps, 'children'> {
    children: string;
    subString: string;
    disabled?: boolean;
}

const SearchView: React.FC<SearchViewProps> = ({ children, subString, disabled, ...rest }) => {
    const firstIndex = children.search(new RegExp(subString, 'i'));
    const lastIndex = firstIndex + subString?.length;

    return (
        <Typography component="span" sx={{ color: disabled ? 'text.disabled' : 'inherit' }} {...rest}>
            {children.slice(0, firstIndex)}
            <Typography component="span" sx={{ fontWeight: 600, color: disabled ? 'text.disabled' : 'info.main' }}>
                {children.slice(firstIndex, lastIndex)}
            </Typography>
            {children.slice(lastIndex)}
        </Typography>
    );
};

export default SearchView;
