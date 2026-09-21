import { MapPinOff, TriangleAlert } from 'lucide-react';
import { isRouteErrorResponse, useRouteError } from 'react-router';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { useParsedError } from '@hooks/useParsedError';

import { ErrorScreen } from './ErrorScreen';
import { isNotFoundError } from './NotFoundError';
import { ErrorResource, errorResources } from './resources';

export interface RouteErrorScreenProps {
    /** Which part of the app threw, which decides the copy and the way back. */
    resource: ErrorResource;
}

/**
 * The `errorElement` every route hangs on. A missing lesson and a broken one
 * arrive here the same way, so the boundary splits them: a wrong turn is told
 * in the learner's own terms, while a real fault keeps the status and the stack
 * for a bug report.
 */
export const RouteErrorScreen = ({ resource }: RouteErrorScreenProps) => {
    const error = useRouteError();
    const details = useParsedError();
    const copy = errorResources[resource];

    // A URL that matches no route at all reaches react-router as a 404 response
    // rather than as something we threw, and reads as a wrong turn just the same.
    const notFound =
        isNotFoundError(error) ||
        (isRouteErrorResponse(error) && error.status === 404);

    return (
        <ErrorScreen
            badge={
                <I18N
                    textKey={
                        notFound
                            ? 'error-badge-not-found'
                            : 'error-badge-unexpected'
                    }
                    lang={I18NLangs.RU}
                />
            }
            badgeIcon={
                notFound ? (
                    <MapPinOff size={14} aria-hidden="true" />
                ) : (
                    <TriangleAlert size={14} aria-hidden="true" />
                )
            }
            title={
                <I18N
                    textKey={
                        notFound
                            ? copy.notFoundTitleKey
                            : 'error-unexpected-title'
                    }
                    lang={I18NLangs.RU}
                />
            }
            description={
                <I18N
                    textKey={
                        notFound
                            ? copy.notFoundTextKey
                            : 'error-unexpected-text'
                    }
                    lang={I18NLangs.RU}
                />
            }
            recoveryTo={copy.recoveryTo}
            recoveryLabel={
                <I18N textKey={copy.recoveryLabelKey} lang={I18NLangs.RU} />
            }
            // A wrong turn has nothing worth reporting; a fault does.
            details={notFound ? undefined : details}
        />
    );
};
