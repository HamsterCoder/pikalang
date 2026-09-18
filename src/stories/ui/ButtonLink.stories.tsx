import type { Meta, StoryObj } from '@storybook/react-vite';
import { Play, RotateCcw } from 'lucide-react';

import { ButtonLink } from '@components/ui/ButtonLink';

const meta = {
    title: 'UI/ButtonLink',
    component: ButtonLink,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        to: '/lessons/food/vegetables-1',
        children: 'Продолжить',
    },
} satisfies Meta<typeof ButtonLink>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Shares every visual rule with `Button`, but navigates instead of firing a handler. */
export const Filled: Story = {
    args: {
        children: (
            <>
                <Play size={18} aria-hidden="true" />
                Продолжить
            </>
        ),
    },
};

export const Text: Story = {
    args: {
        variant: 'text',
        children: (
            <>
                <RotateCcw size={18} aria-hidden="true" />
                Повторить
            </>
        ),
    },
};

export const Small: Story = {
    args: { size: 'small' },
};
