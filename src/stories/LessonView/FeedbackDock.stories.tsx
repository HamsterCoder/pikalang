import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { FeedbackDock } from '@components/LessonView/FeedbackDock';

const meta = {
    title: 'LessonView/FeedbackDock',
    component: FeedbackDock,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        verdict: { solved: true, expected: 'Ovo je paprika' },
        onContinue: fn(),
    },
} satisfies Meta<typeof FeedbackDock>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Correct: Story = {};

/** A second accepted phrasing is worth showing even when the answer was right. */
export const CorrectWithAlternative: Story = {
    args: {
        verdict: {
            solved: true,
            expected: 'Možno mne vilku?',
            alternative: 'Možno vilku?',
        },
    },
};

export const CorrectWithTranslation: Story = {
    args: {
        verdict: {
            solved: true,
            expected: 'Beograd nije mali grad.',
            translation: 'Белград не маленький город.',
        },
    },
};

export const Incorrect: Story = {
    args: { verdict: { solved: false, expected: 'Ovo je paprika' } },
};
