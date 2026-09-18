import type { Meta, StoryObj } from '@storybook/react-vite';

import { PathLesson } from '@components/LessonPath/PathLesson';

const meta = {
    title: 'LessonPath/PathLesson',
    component: PathLesson,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        state: 'active',
        index: 2,
        unitIndex: 1,
        title: 'Еда · Овощи 1',
        description: 'Учим названия некоторых овощей',
        topic: 'food',
        to: '/lessons/food/vegetables-1',
        currentTries: 2,
        recommendedTries: 4,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PathLesson>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The lesson the learner should open next: ringed, pulsing, with a filled CTA. */
export const Active: Story = {};

export const NotStarted: Story = {
    args: { currentTries: 0 },
};

export const Completed: Story = {
    args: { state: 'completed', currentTries: 4 },
};

export const Locked: Story = {
    args: {
        state: 'locked',
        index: 3,
        title: 'Еда · Фрукты 1',
        description: 'Учим названия некоторых фруктов',
        currentTries: 0,
    },
};

/** The connector is what turns a stack of cards into a path. */
export const Connected: Story = {
    args: { connected: true },
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
            <PathLesson
                {...args}
                state="completed"
                index={1}
                title="Разговор · Приветствия"
                description="Учимся здороваться и прощаться"
                topic="conversation"
                currentTries={4}
                connected
            />
            <PathLesson {...args} connected />
            <PathLesson
                {...args}
                state="locked"
                index={3}
                title="Глаголы · Разуметь"
                description="Спряжение глагола razumeti"
                topic="verb"
                currentTries={0}
                connected={false}
            />
        </div>
    ),
};

/** Each topic gets its own milestone icon; unknown topics fall back to a book. */
export const TopicIcons: Story = {
    render: (args) => (
        <div
            style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}
        >
            <PathLesson
                {...args}
                topic="conversation"
                title="Разговор · Языки"
            />
            <PathLesson {...args} topic="food" title="Еда · Овощи 1" />
            <PathLesson {...args} topic="verb" title="Глаголы · Jesam" />
            <PathLesson {...args} topic="grammar" title="Грамматика · Падежи" />
        </div>
    ),
};
