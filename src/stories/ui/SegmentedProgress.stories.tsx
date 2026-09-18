import type { Meta, StoryObj } from '@storybook/react-vite';

import { SegmentedProgress } from '@components/ui/SegmentedProgress';

const meta = {
    title: 'UI/SegmentedProgress',
    component: SegmentedProgress,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        total: 4,
        completed: 2,
        'aria-label': 'Подходы к уроку',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '24rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SegmentedProgress>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A lesson the learner has attempted twice out of the four recommended runs. */
export const InProgress: Story = {
    args: { label: '2/4 подходов' },
};

export const Complete: Story = {
    args: { completed: 4, tone: 'success', label: '4/4 подходов' },
};

export const NotStarted: Story = {
    args: { completed: 0, tone: 'muted', label: '4 подходов' },
};

export const WithoutLabel: Story = {
    args: { completed: 3 },
};

/** The count comes from the lesson data, so the bar has to take any length. */
export const ManySteps: Story = {
    args: { total: 10, completed: 6, label: '6/10 подходов' },
};
