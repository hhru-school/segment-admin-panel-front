import CloseIcon from '@mui/icons-material/Close';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Popover from '@mui/material/Popover';

import useErrorAlert from 'hooks/useErrorAlert';

const ErrorAlert: React.FC = () => {
    const { message, isShow, hide } = useErrorAlert();

    return (
        <Popover
            open={isShow}
            anchorReference="anchorPosition"
            anchorPosition={{ top: window.innerHeight - 50, left: window.innerWidth - 50 }}
            transformOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
        >
            <Alert
                action={
                    <IconButton aria-label="close" color="inherit" size="small" onClick={hide}>
                        <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                severity="error"
                variant="outlined"
                sx={{ minWidth: 300 }}
            >
                <AlertTitle>Ошибка!</AlertTitle>
                {message}
            </Alert>
        </Popover>
    );
};

export default ErrorAlert;
