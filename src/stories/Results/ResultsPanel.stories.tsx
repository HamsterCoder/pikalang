import type { Meta, StoryObj } from '@storybook/react-vite';
import { BookOpen, Timer, Zap } from 'lucide-react';

import { ResultsPanel } from '@components/Results/ResultsPanel';
import { StarTally } from '@components/WordLesson/StarTally';

const meta = {
    title: 'Results/ResultsPanel',
    component: ResultsPanel,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        title: 'Отличная работа!',
        highlight: <StarTally earned={7} total={8} size="large" />,
        rows: [
            {
                id: 'learned',
                icon: <BookOpen size={16} aria-hidden="true" />,
                label: 'Новых слов выучено',
                value: '4 / 4',
            },
            {
                id: 'time',
                icon: <Timer size={16} aria-hidden="true" />,
                label: 'Время на пары',
                value: '0:07.4',
            },
        ],
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof ResultsPanel>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The shape both result screens take: mascot, appraisal, tally, rows. */
export const Default: Story = {};

/** A single row, for a run with only one thing worth counting. */
export const OneRow: Story = {
    args: {
        rows: [
            {
                id: 'xp',
                icon: <Zap size={16} aria-hidden="true" />,
                label: 'Опыт',
                value: '+8',
            },
        ],
    },
};

/** Without a tally, when the rows say everything there is to say. */
export const NoHighlight: Story = { args: { highlight: undefined } };

/** A long label wraps rather than pushing the number off the row. */
export const LongLabel: Story = {
    args: {
        rows: [
            {
                id: 'matched',
                icon: <BookOpen size={16} aria-hidden="true" />,
                label: 'Пар угадано с первого раза без единой подсказки',
                value: '12 / 12',
            },
        ],
    },
};
