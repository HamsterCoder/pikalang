import { isApiError } from '@api/conversations';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';

export interface PreparedErrorData {
    status?: string | number;
    message?: string;
    data: string;
}

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

export const useParsedError = (): PreparedErrorData => {
    const error = useRouteError();

    return prepareErrorData(error);
};
