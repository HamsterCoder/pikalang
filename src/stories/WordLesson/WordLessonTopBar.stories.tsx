import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { WordLessonTopBar } from '@components/WordLesson/WordLessonTopBar';

const meta = {
    title: 'WordLesson/WordLessonTopBar',
    component: WordLessonTopBar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        progress: 40,
        stars: 3,
        maxStars: 8,
        onExit: fn(),
    },
} satisfies Meta<typeof WordLessonTopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Reading the new words: no clock yet. */
export const LearningWords: Story = {};

/** The matching round, with the stopwatch running. */
export const Matching: Story = {
    args: { progress: 85, stars: 6, elapsedMs: 13400 },
};

/** At the start of a set. */
export const Fresh: Story = { args: { progress: 0, stars: 0 } };

/** Every star earned, the clock stopped. */
export const Finished: Story = {
    args: { progress: 100, stars: 8, elapsedMs: 8200 },
};
