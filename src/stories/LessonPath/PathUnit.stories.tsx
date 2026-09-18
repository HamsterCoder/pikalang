import type { Meta, StoryObj } from '@storybook/react-vite';

import { PathUnit } from '@components/LessonPath/PathUnit';
import { LessonListItem } from '@api/lessons';

function lesson(
    id: string,
    displayName: string,
    topic: string,
    displayTopic: string,
    currentTries: number,
    locked = false,
): LessonListItem {
    return {
        id,
        name: id.split('/')[1],
        displayName,
        topic,
        displayTopic,
        description: 'Описание урока для превью',
        image: 'vegetables',
        progress: Math.min((currentTries / 4) * 100, 100),
        locked,
        currentTries,
        recommendedTries: 4,
    };
}

const lessons: LessonListItem[] = [
    lesson(
        'conversation/greetings-1',
        'Приветствия',
        'conversation',
        'Разговор',
        4,
    ),
    lesson('conversation/languages', 'Языки', 'conversation', 'Разговор', 2),
    lesson('verb/jesam', 'jesam', 'verb', 'Глагол', 0, true),
    lesson('verb/nisam', 'nisam', 'verb', 'Глагол', 0, true),
];

const meta = {
    title: 'LessonPath/PathUnit',
    component: PathUnit,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        index: 1,
        title: 'Введение',
        lessons,
        nextUnit: { title: 'Еда', lessonCount: 6 },
    },
} satisfies Meta<typeof PathUnit>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The desktop treatment: a milestone card per lesson, closed by a teaser. */
export const Cards: Story = {
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
};

/**
 * The phone treatment. The same lessons and the same three states, as one
 * dense row each: no descriptions, no buttons, and no teaser card.
 */
export const Compact: Story = {
    args: { variant: 'compact' },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '24rem' }}>
                <Story />
            </div>
        ),
    ],
};

/** The two side by side, at the widths each is meant for. */
export const Comparison: Story = {
    render: (args) => (
        <div
            style={{
                display: 'flex',
                gap: '2rem',
                alignItems: 'flex-start',
                flexWrap: 'wrap',
            }}
        >
            <div style={{ flex: '1 1 26rem', minWidth: 0 }}>
                <PathUnit {...args} variant="cards" />
            </div>
            <div style={{ flex: '0 1 22rem', minWidth: 0 }}>
                <PathUnit {...args} variant="compact" />
            </div>
        </div>
    ),
};

/** A finished unit earns the trophy badge and a full progress bar. */
export const Complete: Story = {
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
    args: {
        lessons: lessons.map((item) => ({
            ...item,
            progress: 100,
            locked: false,
            currentTries: 4,
        })),
    },
};

/** The last unit on the path closes with the end card instead of a teaser. */
export const LastUnit: Story = {
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
    args: { index: 3, title: 'Полезные глаголы', nextUnit: undefined },
};
