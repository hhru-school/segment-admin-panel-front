import { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';

import { useAppDispatch } from 'hooks/redux-hooks';
import { fetchFields, setSearchString } from 'models/fields';

interface FieldsSearchFormProps {
    disabled?: boolean;
}

const FieldsSearchForm: React.FC<FieldsSearchFormProps> = ({ disabled }) => {
    const dispatch = useAppDispatch();
    const [searchString, setSetSearchString] = useState('');

    const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        setSetSearchString(event.target.value);
    };

    const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
        event.preventDefault();
        void dispatch(fetchFields({ layerId: 7, searchString }));
        dispatch(setSearchString(searchString));
    };

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                onChange={handleChange}
                label="Поиск"
                InputProps={{
                    endAdornment: (
                        <IconButton type="submit">
                            <SearchIcon />
                        </IconButton>
                    ),
                }}
                autoComplete="off"
                disabled={disabled}
                fullWidth
            />
        </form>
    );
};

export default FieldsSearchForm;
