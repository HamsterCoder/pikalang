import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { WordBank } from '@components/LessonView/WordBank';

const meta = {
    title: 'LessonView/WordBank',
    component: WordBank,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        words: ['Ovo', 'paprika', 'krastavac', 'je', 'nije', 'tomato'],
        usedIndices: [0, 3],
        onPick: fn(),
        onReset: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof WordBank>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A used word keeps its place in the grid so the rest never shift. */
export const PartlyUsed: Story = {};

export const Untouched: Story = {
    args: { usedIndices: [] },
};

export const Locked: Story = {
    args: { disabled: true },
};
