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

/** The word bank keeps every tile in place, so a used one greys out here. */
export const Bank: Story = {
    args: { variant: 'bank' },
};

export const BankUsed: Story = {
    args: { variant: 'bank', disabled: true },
};

/** A word the learner has placed into their answer, and can take back. */
export const Solid: Story = {
    args: { variant: 'solid' },
};
