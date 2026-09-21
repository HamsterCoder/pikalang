/**
 * What each error boundary says and where it sends the learner back to. The
 * route only names the resource it guards; the copy and the way out live here,
 * so every dead end in the app is worded from one place.
 */
export type ErrorResource = 'lesson' | 'word-set' | 'app';

export interface ErrorResourceCopy {
    /** Shown when the URL names something that does not exist. */
    notFoundTitleKey: string;
    notFoundTextKey: string;
    recoveryTo: string;
    recoveryLabelKey: string;
}

export const errorResources: Record<ErrorResource, ErrorResourceCopy> = {
    lesson: {
        notFoundTitleKey: 'error-lesson-not-found-title',
        notFoundTextKey: 'error-lesson-not-found-text',
        recoveryTo: '/lessons/',
        recoveryLabelKey: 'error-back-to-lessons',
    },
    'word-set': {
        notFoundTitleKey: 'error-word-set-not-found-title',
        notFoundTextKey: 'error-word-set-not-found-text',
        recoveryTo: '/words/',
        recoveryLabelKey: 'error-back-to-words',
    },
    app: {
        notFoundTitleKey: 'error-page-not-found-title',
        notFoundTextKey: 'error-page-not-found-text',
        recoveryTo: '/lessons/',
        recoveryLabelKey: 'error-back-to-lessons',
    },
};
