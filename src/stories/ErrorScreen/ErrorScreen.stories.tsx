import type { Meta, StoryObj } from '@storybook/react-vite';
import { MapPinOff, TriangleAlert } from 'lucide-react';

import { ErrorScreen } from '@components/ErrorScreen/ErrorScreen';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';

const key = (textKey: string) => <I18N textKey={textKey} lang={I18NLangs.RU} />;

const notFoundBadge = {
    badge: key('error-badge-not-found'),
    badgeIcon: <MapPinOff size={14} aria-hidden="true" />,
};

const meta = {
    title: 'ErrorScreen/ErrorScreen',
    component: ErrorScreen,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        ...notFoundBadge,
        title: key('error-lesson-not-found-title'),
        description: key('error-lesson-not-found-text'),
        recoveryTo: '/lessons/',
        recoveryLabel: key('error-back-to-lessons'),
    },
} satisfies Meta<typeof ErrorScreen>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A lesson id that is not in the course: the commonest way in. */
export const LessonNotFound: Story = {};

/** The same dead end in the word lesson, which sends you back to the topics. */
export const WordSetNotFound: Story = {
    args: {
        title: key('error-word-set-not-found-title'),
        description: key('error-word-set-not-found-text'),
        recoveryTo: '/words/',
        recoveryLabel: key('error-back-to-words'),
    },
};

/** A URL that matches no route at all, caught by the app's own boundary. */
export const PageNotFound: Story = {
    args: {
        title: key('error-page-not-found-title'),
        description: key('error-page-not-found-text'),
    },
};

/**
 * A real fault rather than a wrong turn: the wording stops promising the thing
 * exists, and the raw error is kept, folded away, for a bug report.
 */
export const Unexpected: Story = {
    args: {
        badge: key('error-badge-unexpected'),
        badgeIcon: <TriangleAlert size={14} aria-hidden="true" />,
        title: key('error-unexpected-title'),
        description: key('error-unexpected-text'),
        details: {
            status: 500,
            message: 'Cannot read properties of undefined (reading ‘id’)',
            data: 'at LessonView (LessonView.tsx:86:24)\nat renderWithHooks (react-dom.development.js:15486:18)',
        },
    },
};
