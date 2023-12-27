import styled from 'styled-components';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { isApiError } from '@api/conversations';
import { Link } from 'react-router-dom';

const Container = styled.div`
    padding: 0 2rem;
`;

function prepareErrorData(error: unknown) {
    // It is important to check for ApiError first so it not confused with RouterErrorResponse
    if (isApiError(error)) {
        return {
            status: error.status,
            message: error.message,
            data: error.data ? String(error.data) : '',
        };
    } else if (isRouteErrorResponse(error)) {
        return {
            status: `${error.status} ${error.statusText}`,
            data: JSON.stringify(error.data),
        };
    } else if (error instanceof Error) {
        return {
            message: error.message,
            data: String(error.stack),
        };
    } else {
        return {
            data: String(error),
        };
    }
}

export interface LoadingErrorProps {
    name: string;
    recoveryTo: string;
    recoveryMessage: string;
}

// TODO create a hook based of off useRouterError - useParsedError
export const LoadingError = ({
    name,
    recoveryTo,
    recoveryMessage,
}: LoadingErrorProps) => {
    const error = prepareErrorData(useRouteError());

    console.log('Loading error:', error);

    return (
        <Container>
            <Typography variant="heading_l">
                {name} could not be loaded due to an error:
            </Typography>
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
