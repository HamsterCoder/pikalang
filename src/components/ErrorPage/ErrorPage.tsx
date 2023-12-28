import styled from 'styled-components';

import { useParsedError } from '@hooks/useParsedError';

const Container = styled.div`
    padding: 0 2rem;
`;

export const ErrorPage = () => {
    const error = useParsedError();

    return (
        <Container>
            <h1>Oops!</h1>
            <p>
                Something unexpected happened. If you like you can forward this
                error message to our github:
            </p>
            <p>
                <i>{error.status}</i>
                <i>{error.message}</i>
            </p>
            <code>{error.data}</code>
        </Container>
    );
};
