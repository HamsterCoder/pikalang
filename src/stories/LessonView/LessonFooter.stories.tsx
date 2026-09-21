import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { LessonFooter } from '@components/LessonView/LessonFooter';

const meta = {
    title: 'LessonView/LessonFooter',
    component: LessonFooter,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        lifecycle: 'challenge',
        verdict: null,
        canCheck: false,
        onStart: fn(),
        onSkip: fn(),
        onCheck: fn(),
        onContinue: fn(),
    },
} satisfies Meta<typeof LessonFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Nothing placed yet: skipping is offered, checking is not. */
export const NothingToCheck: Story = {};

export const ReadyToCheck: Story = {
    args: { canCheck: true },
};

/** The verdict takes over the bar, and Continue stands where Check stood. */
export const Correct: Story = {
    args: {
        verdict: { solved: true, expected: 'Ovo je paprika' },
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
    args: {
        verdict: { solved: false, expected: 'Ovo je paprika' },
    },
};

/** Lessons with a help screen open on this. */
export const Help: Story = {
    args: { lifecycle: 'help' },
};

export const Complete: Story = {
    args: { lifecycle: 'complete' },
};
