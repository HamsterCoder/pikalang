import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Chip } from '@components/ui/Chip';

const meta = {
    title: 'UI/Chip',
    component: Chip,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        label: 'Dobar',
        onClick: fn(),
    },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A word the learner can pick while composing an answer. */
export const Default: Story = {};

export const LongLabel: Story = {
    args: { label: 'Doviđenja!' },
};

export const Disabled: Story = {
    args: { disabled: true },
};
