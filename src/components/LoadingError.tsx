import styled from 'styled-components';
import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { useParsedError } from '@hooks/useParsedError';
import { Heading } from '@components/Heading';

const Container = styled.div`
    padding: 0 2rem;
`;

export interface LoadingErrorProps {
    name: string;
    recoveryTo: string;
    recoveryMessage: string;
}

export const LoadingError = ({
    name,
    recoveryTo,
    recoveryMessage,
}: LoadingErrorProps) => {
    const error = useParsedError();

    return (
        <Container>
            <Heading size="l">
                {name} could not be loaded due to an error:
            </Heading>
            <div>
                <p>Code: {error.status ?? ''}</p>
                <p>Message: {error.message ?? ''}</p>
                <p>Data: {error.data ?? ''}</p>
            </div>
            <Link to={recoveryTo}>
                <Button color="success" variant="contained">
                    {recoveryMessage}
                </Button>
            </Link>
        </Container>
    );
};
