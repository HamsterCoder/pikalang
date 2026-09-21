import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { LessonTopBar } from '@components/LessonView/LessonTopBar';

const meta = {
    title: 'LessonView/LessonTopBar',
    component: LessonTopBar,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        current: 3,
        total: 10,
        progress: 20,
        onExit: fn(),
    },
} satisfies Meta<typeof LessonTopBar>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * Part way in. The progress trails the counter: a challenge counts once it is
 * answered, while the learner is still looking at it.
 */
export const InProgress: Story = {};

export const JustStarted: Story = {
    args: { current: 1, progress: 0 },
};

export const LastChallenge: Story = {
    args: { current: 10, progress: 90 },
};

export const Finished: Story = {
    args: { current: 10, progress: 100 },
};

/** A short lesson still fills the bar, so the counter carries the detail. */
export const ShortLesson: Story = {
    args: { current: 2, total: 3, progress: 33 },
};
