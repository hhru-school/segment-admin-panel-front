import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import Wrapper from 'components/Wrapper';

const NotFoundPage: React.FC = () => {
    return (
        <Wrapper sx={{ alignItems: 'center', justifyContent: 'center' }}>
            <Card variant="outlined" sx={{ p: 4, width: 600 }}>
                <CardHeader title="404" titleTypographyProps={{ variant: 'h1', align: 'center' }} />
                <CardContent sx={{ mb: 4 }}>
                    <Typography align="center">Упс...! Такой страницы не существует!</Typography>
                </CardContent>
                <CardActions sx={{ justifyContent: 'center' }}>
                    <Button variant="outlined" href="/">
                        На главную
                    </Button>
                </CardActions>
            </Card>
        </Wrapper>
    );
};

export default NotFoundPage;
