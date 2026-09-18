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
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PathUnit>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The unit the learner is working on: full milestone cards, chevron up. */
export const Expanded: Story = {};

/**
 * Everything else starts collapsed, trading the cards for one dense row per
 * lesson. Use the chevron to switch between the two.
 */
export const Collapsed: Story = {
    args: { defaultOpen: false },
};

/** A finished unit earns the trophy badge and a full progress bar. */
export const Complete: Story = {
    args: {
        defaultOpen: false,
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
    args: { index: 3, title: 'Полезные глаголы', nextUnit: undefined },
};
