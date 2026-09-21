import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { AnswerStrip } from '@components/LessonView/AnswerStrip';

const meta = {
    title: 'LessonView/AnswerStrip',
    component: AnswerStrip,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        words: ['Ovo', 'je'],
        expected: 'Ovo je paprika',
        onRemove: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof AnswerStrip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Words placed so far, with a dashed slot for the one still missing. */
export const PartlyAnswered: Story = {};

/** Before the first word, the slots show how long the sentence will be. */
export const Empty: Story = {
    args: { words: [] },
};

export const Complete: Story = {
    args: { words: ['Ovo', 'je', 'paprika'] },
};

/** Once the answer is checked the words can no longer be taken back. */
export const Locked: Story = {
    args: { words: ['Ovo', 'je', 'paprika'], disabled: true },
};
