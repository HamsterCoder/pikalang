import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flame, Star, Trophy } from 'lucide-react';

import { StatPill } from '@components/ui/StatPill';

const meta = {
    title: 'UI/StatPill',
    component: StatPill,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: '37',
        'aria-label': 'Опыт',
    },
} satisfies Meta<typeof StatPill>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The experience counter, as it appears on the right of the header. */
export const Experience: Story = {
    args: {
        tone: 'accent',
        icon: <Star size="1em" fill="currentColor" aria-hidden="true" />,
    },
};

/** Text-only pills work too — the header uses one for the active course. */
export const Course: Story = {
    args: { children: '🇷🇸 Сербский', 'aria-label': 'Текущий курс' },
};

export const Trophyish: Story = {
    name: 'Trophy',
    args: {
        tone: 'trophy',
        icon: <Trophy size="1em" aria-hidden="true" />,
        children: '3 раздела',
        'aria-label': 'Пройдено разделов',
    },
};

export const Row: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <StatPill>🇷🇸 Сербский</StatPill>
            <StatPill
                tone="trophy"
                icon={<Flame size="1em" fill="currentColor" />}
            >
                7
            </StatPill>
            <StatPill
                tone="accent"
                icon={<Star size="1em" fill="currentColor" />}
            >
                1 420
            </StatPill>
        </div>
    ),
};
