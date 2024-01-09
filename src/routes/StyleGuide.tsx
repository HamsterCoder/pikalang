import { Heading } from '@components/Heading';
import { Typography } from '@mui/material';
import styled from 'styled-components';

const Example = styled.div`
    padding: 1rem 2rem;
`;

export const StyleGuide = function () {
    return (
        <>
            <Example>
                <Typography variant="heading_l">Большой заголовок</Typography>
                <Typography variant="heading_m">Средний заголовок</Typography>
                <Typography variant="heading_s">Маленький заголовок</Typography>
                <Typography variant="text_primary">Основной текст</Typography>
                <Typography variant="text_secondary">
                    Дополнительный текст
                </Typography>
            </Example>

            <Example>
                <Heading size="l" color="default">
                    Большой заголовок
                </Heading>
                <Heading size="m" color="default">
                    Средний заголовок
                </Heading>
                <Heading size="s" color="default">
                    Маленький заголовок
                </Heading>
                <Typography variant="text_primary">Основной текст</Typography>
                <Typography variant="text_secondary">
                    Дополнительный текст
                </Typography>
            </Example>
        </>
    );
};
