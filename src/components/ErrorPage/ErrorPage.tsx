import { FunctionComponent } from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import styled from 'styled-components';

// https://github.com/remix-run/react-router/discussions/9628#discussioncomment-5555901
function errorMessage(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return `${error.status} ${error.statusText}`;
    } else if (error instanceof Error) {
        return error.message;
    } else if (typeof error === 'string') {
        return error;
    } else {
        console.error(error);
        return 'Unknown error';
    }
}

function errorData(error: unknown): string {
    if (isRouteErrorResponse(error)) {
        return JSON.stringify(error.data);
    } else if (error instanceof Error) {
        return String(error.stack);
    } else if (typeof error === 'string') {
        return error;
    } else {
        console.error(error);
        return 'Unknown error';
    }
}

const Container = styled.div`
    padding: 0 40px;
`;

export const ErrorPage: FunctionComponent = () => {
    const error = useRouteError();

    console.error(error);

    return (
        <Container>
            <h1>Oops!</h1>
            <p>
                Something unexpected happened. If you like you can forward this
                error message to our github:
            </p>
            <p>
                <i>{errorMessage(error)}</i>
            </p>
            <code>{errorData(error)}</code>
        </Container>
    );
};
