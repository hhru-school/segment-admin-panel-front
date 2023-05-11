import Typography from '@mui/material/Typography';

interface SearchViewProps {
    string: string;
    subString: string;
}

const SearchView: React.FC<SearchViewProps> = ({ string, subString }) => {
    const firstIndex = string.search(new RegExp(subString, 'i'));
    const lastIndex = firstIndex + subString.length;

    return (
        <Typography component="span">
            {string.slice(0, firstIndex)}
            <Typography component="span" sx={{ fontWeight: 600, color: 'info.main' }}>
                {string.slice(firstIndex, lastIndex)}
            </Typography>
            {string.slice(lastIndex)}
        </Typography>
    );
};

export default SearchView;
