import type { Meta, StoryObj } from '@storybook/react-vite';
import { MemoryRouter } from 'react-router';

import { TopicCard } from '@components/WordTopics/TopicCard';

const meta = {
    title: 'WordTopics/TopicCard',
    component: TopicCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        name: 'vegetables',
        displayName: 'Овощи',
        description: 'То, что лежит на прилавке зеленщика',
        image: 'sweet-pepper',
        wordCount: 8,
        learnedCount: 0,
        setCount: 2,
        completedSets: 0,
        stars: 0,
        maxStars: 16,
        nextSet: 1,
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div
                    style={{
                        containerType: 'inline-size',
                        containerName: 'topics',
                        maxWidth: '44rem',
                    }}
                >
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof TopicCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A topic the learner has not opened yet. */
export const Untouched: Story = {};

/** One set down, one to go. */
export const InProgress: Story = {
    args: {
        learnedCount: 4,
        completedSets: 1,
        stars: 7,
        nextSet: 2,
    },
};

/** Every set played: the action turns into a review. */
export const Finished: Story = {
    args: {
        displayName: 'Ягоды',
        description: 'Всё, что продают на рынке стаканчиками',
        image: 'strawberry',
        name: 'berries',
        wordCount: 6,
        learnedCount: 6,
        setCount: 2,
        completedSets: 2,
        stars: 11,
        maxStars: 12,
        nextSet: 1,
    },
};

/** At phone width the cover moves above the text. */
export const Narrow: Story = {
    args: { learnedCount: 4, completedSets: 1, stars: 7, nextSet: 2 },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <div
                    style={{
                        containerType: 'inline-size',
                        containerName: 'topics',
                        maxWidth: '22rem',
                    }}
                >
                    <Story />
                </div>
            </MemoryRouter>
        ),
    ],
};
