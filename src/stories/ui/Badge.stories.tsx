import type { Meta, StoryObj } from '@storybook/react-vite';
import { Check, Lock, Trophy, Zap } from 'lucide-react';

import { Badge } from '@components/ui/Badge';
import { tokens } from '@themes/tokens';

const meta = {
    title: 'UI/Badge',
    component: Badge,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        children: 'В процессе',
    },
} satisfies Meta<typeof Badge>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Accent: Story = {
    args: { tone: 'accent', icon: <Zap size="0.9em" /> },
};

export const Success: Story = {
    args: {
        tone: 'success',
        icon: <Check size="0.9em" />,
        children: 'Пройден',
    },
};

export const Muted: Story = {
    args: { tone: 'muted', icon: <Lock size="0.9em" />, children: 'Закрыт' },
};

export const Trophyish: Story = {
    name: 'Trophy',
    args: {
        tone: 'trophy',
        icon: <Trophy size="0.9em" />,
        children: 'Раздел пройден',
    },
};

/** For badges sitting on the accent-coloured unit banner. */
export const Inverted: Story = {
    args: { tone: 'inverted', children: 'Раздел 1' },
    decorators: [
        (Story) => (
            <div
                style={{
                    padding: '1.5rem',
                    background: tokens.color.accent,
                    borderRadius: tokens.radius.l,
                }}
            >
                <Story />
            </div>
        ),
    ],
};

export const AllTones: Story = {
    render: () => (
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <Badge tone="accent" icon={<Zap size="0.9em" />}>
                В процессе
            </Badge>
            <Badge tone="success" icon={<Check size="0.9em" />}>
                Пройден
            </Badge>
            <Badge tone="muted" icon={<Lock size="0.9em" />}>
                Закрыт
            </Badge>
            <Badge tone="trophy" icon={<Trophy size="0.9em" />}>
                Раздел пройден
            </Badge>
        </div>
    ),
};
