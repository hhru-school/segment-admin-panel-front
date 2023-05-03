import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';

import background from 'pages/UnderConstructionPage/background.svg';

const Wrapper = styled(Paper)({
    backgroundRepeat: 'no-repeat',
    backgroundImage: `url(${background})`,
    backgroundSize: 240,
    backgroundPosition: 'center 40%',
});

interface UnderConstructionPageProps {
    pageName: string;
    nextLink?: React.ReactNode;
}

const UnderConstructionPage: React.FC<UnderConstructionPageProps> = ({ pageName, nextLink }) => {
    return (
        <Wrapper variant="outlined" sx={{ p: 6, mt: 3 }}>
            <Typography align="center" sx={{ mb: 42 }}>
                Вы сейчас находитесь на странице{' '}
                <Typography component="span" sx={{ fontWeight: 'bold' }}>
                    {pageName}
                </Typography>
                {nextLink !== undefined ? <Typography component="span">, перейти на {nextLink}</Typography> : '.'}
            </Typography>
            <Typography variant="h4" align="center" sx={{ mb: 3 }}>
                В разработке
            </Typography>
            <Typography variant="body1" align="center">
                Извините, страница сейчас находится в процессе разработки.
            </Typography>
        </Wrapper>
    );
};

export default UnderConstructionPage;
