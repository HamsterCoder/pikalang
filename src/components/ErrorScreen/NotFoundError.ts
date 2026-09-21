/**
 * Thrown when the URL names something the app does not have — a lesson id that
 * is not in `lessonsMap`, a word set past the end of its topic. It is a plain
 * `Error` so react-router's error boundary catches it like any other, but the
 * class lets `RouteErrorScreen` tell "you took a wrong turn" apart from "the
 * app broke", which are two very different things to say to a learner.
 */
export class NotFoundError extends Error {
    /** What the URL was pointing at, e.g. `srb-ru/lesson-99`. */
    readonly resourceId: string;

    constructor(resourceId: string, message: string) {
        super(message);

        this.name = 'NotFoundError';
        this.resourceId = resourceId;
    }
}

export function isNotFoundError(error: unknown): error is NotFoundError {
    return error instanceof NotFoundError;
}
