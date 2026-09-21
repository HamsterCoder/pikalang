import type { Meta, StoryObj } from '@storybook/react-vite';

import { WordLessonResults } from '@components/WordLesson/WordLessonResults';

const meta = {
    title: 'WordLesson/WordLessonResults',
    component: WordLessonResults,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        learnedStars: 4,
        matchStars: 3,
        wordCount: 4,
        timeMs: 14600,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof WordLessonResults>;

export default meta;

type Story = StoryObj<typeof meta>;

/** One pair took a second guess, so it went without its star. */
export const OneMissed: Story = {};

/** Every star: four words read, four pairs matched first time. */
export const Perfect: Story = { args: { matchStars: 4, timeMs: 7400 } };

/** Words the learner skipped as already known earn nothing. */
export const SkippedWords: Story = {
    args: { learnedStars: 1, matchStars: 4, timeMs: 6100 },
};

/** A set of three, from a six-word topic. */
export const ThreeWords: Story = {
    args: {
        learnedStars: 3,
        matchStars: 2,
        wordCount: 3,
        timeMs: 65300,
    },
};
