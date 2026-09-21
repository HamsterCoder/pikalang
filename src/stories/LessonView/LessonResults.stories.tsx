import type { Meta, StoryObj } from '@storybook/react-vite';

import { LessonResults } from '@components/LessonView/LessonResults';

const meta = {
    title: 'LessonView/LessonResults',
    component: LessonResults,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        correct: 8,
        answered: 10,
        total: 10,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof LessonResults>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A lesson played to the end with a couple of mistakes along the way. */
export const TwoMissed: Story = {};

/** Every challenge right: the tally fills and the XP matches the lesson. */
export const Perfect: Story = { args: { correct: 10 } };

/**
 * Left after four challenges. The stars count against the whole lesson, so the
 * headline shows the shortfall while the rows show what was actually done.
 */
export const LeftEarly: Story = { args: { correct: 3, answered: 4 } };

/** Nothing right. The screen still congratulates the effort, and earns nothing. */
export const NoneCorrect: Story = { args: { correct: 0 } };

/** A short lesson, where the course has fewer than ten challenges to give. */
export const ShortLesson: Story = {
    args: { correct: 5, answered: 6, total: 6 },
};
