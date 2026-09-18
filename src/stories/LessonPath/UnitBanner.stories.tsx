import type { Meta, StoryObj } from '@storybook/react-vite';

import { UnitBanner } from '@components/LessonPath/UnitBanner';

const meta = {
    title: 'LessonPath/UnitBanner',
    component: UnitBanner,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        index: 1,
        title: 'Введение',
        completed: 1,
        total: 4,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof UnitBanner>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {};

export const Untouched: Story = {
    args: { index: 2, title: 'Еда', completed: 0, total: 6 },
};

/** A finished section earns a trophy badge next to the unit label. */
export const Complete: Story = {
    args: { completed: 4 },
};
