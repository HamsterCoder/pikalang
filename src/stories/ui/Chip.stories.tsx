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
        variant: 'bank',
        onClick: fn(),
    },
} satisfies Meta<typeof Chip>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The word bank keeps every tile in place, so a used one greys out here. */
export const Bank: Story = {};

export const BankUsed: Story = {
    args: { disabled: true },
};

/** A word the learner has placed into their answer, and can take back. */
export const Solid: Story = {
    args: { variant: 'solid' },
};

export const LongLabel: Story = {
    args: { label: 'Doviđenja!' },
};
