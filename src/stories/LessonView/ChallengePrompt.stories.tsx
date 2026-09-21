import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChallengePrompt } from '@components/LessonView/ChallengePrompt';

const meta = {
    title: 'LessonView/ChallengePrompt',
    component: ChallengePrompt,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        children: 'Переведите предложение',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ChallengePrompt>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

/** The rule stays put when the prompt wraps, rather than centring on the block. */
export const Wrapping: Story = {
    args: { children: 'Вставьте пропущенные слова в предложение ниже' },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '18rem' }}>
                <Story />
            </div>
        ),
    ],
};
