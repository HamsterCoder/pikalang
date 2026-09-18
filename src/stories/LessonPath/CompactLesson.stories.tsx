import type { Meta, StoryObj } from '@storybook/react-vite';

import { CompactLesson } from '@components/LessonPath/CompactLesson';

const meta = {
    title: 'LessonPath/CompactLesson',
    component: CompactLesson,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        state: 'active',
        title: 'Еда · Овощи 1',
        topic: 'food',
        to: '/lessons/food/vegetables-1',
        currentTries: 2,
        recommendedTries: 4,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '34rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CompactLesson>;

export default meta;

type Story = StoryObj<typeof meta>;

/** How a lesson reads while its unit is collapsed. */
export const Active: Story = {};

export const Completed: Story = {
    args: { state: 'completed', currentTries: 4 },
};

/** Locked rows are plain text, not links, so they cannot be tabbed into. */
export const Locked: Story = {
    args: { state: 'locked', currentTries: 0 },
};

/** Long names are truncated rather than wrapping — the row stays one line. */
export const LongTitle: Story = {
    args: { title: 'Еда · Посуда и кухонные приборы для сервировки стола' },
};

export const Stacked: Story = {
    render: (args) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <CompactLesson
                {...args}
                state="completed"
                title="Разговор · Приветствия"
                topic="conversation"
                currentTries={4}
            />
            <CompactLesson {...args} />
            <CompactLesson
                {...args}
                state="locked"
                title="Глагол · jesam"
                topic="verb"
                currentTries={0}
            />
        </div>
    ),
};
