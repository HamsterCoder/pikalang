import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button } from '@components/ui/Button';

const meta = {
    title: 'UI/Button',
    component: Button,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: 'Проверить',
        onClick: fn(),
    },
} satisfies Meta<typeof Button>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Primary action on the brand colour. */
export const Filled: Story = {};

/** Used to confirm an answer and to move on to the next challenge. */
export const Success: Story = {
    args: { tone: 'success' },
};

/** Low emphasis action, e.g. inside a card. */
export const Text: Story = {
    args: { variant: 'text', children: 'Начать' },
};

export const TextSmall: Story = {
    args: { variant: 'text', size: 'small', children: 'Начать' },
};

export const Disabled: Story = {
    args: { tone: 'success', disabled: true },
};
