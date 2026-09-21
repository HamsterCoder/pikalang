import type { Meta, StoryObj } from '@storybook/react-vite';

import { StarTally } from '@components/WordLesson/StarTally';

const meta = {
    title: 'WordLesson/StarTally',
    component: StarTally,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        earned: 5,
        total: 8,
    },
} satisfies Meta<typeof StarTally>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The running count in the top bar. */
export const Small: Story = {};

/** Nothing earned yet, at the top of a set. */
export const Empty: Story = { args: { earned: 0 } };

/** Every star in hand. */
export const Full: Story = { args: { earned: 8 } };

/** The result screen shows the same tally, larger. */
export const Large: Story = { args: { size: 'large' } };

/** Without a total it is a plain count, as on a topic card. */
export const CountOnly: Story = { args: { total: undefined } };
