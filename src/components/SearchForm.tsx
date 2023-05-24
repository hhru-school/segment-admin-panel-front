import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

interface SearchFormProps {
    onSubmit?: (searchString: string) => void;
    disabled?: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSubmit, disabled }) => {
    const [searchString, setSetSearchString] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSetSearchString(event.target.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        onSubmit && onSubmit(searchString);
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                value={searchString}
                onChange={handleChange}
                placeholder="Начните вводить наименование"
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <IconButton type="submit" size="small" edge="start">
                                <SearchIcon fontSize="small" />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                autoComplete="off"
                size="small"
                disabled={disabled}
                fullWidth
            />
        </form>
    );
};

export default SearchForm;
