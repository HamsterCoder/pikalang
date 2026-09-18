import type { Meta, StoryObj } from '@storybook/react-vite';

import { ProgressBar } from '@components/ui/ProgressBar';
import { Spinner } from '@components/ui/Spinner';
import { Tooltip } from '@components/ui/Tooltip';
import { HintTooltip } from '@components/HintTooltip';
import { Fab } from '@components/ui/Fab';
import { IconButton } from '@components/ui/IconButton';

const meta = {
    title: 'UI/Feedback',
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

/** Lesson progress, shown along the bottom edge of a lesson card. */
export const Progress: Story = {
    render: () => (
        <div style={{ width: '280px' }}>
            <ProgressBar value={25} aria-label="Прогресс урока" />
        </div>
    ),
};

/** `inverted` tone, for the accent-coloured lesson header. */
export const ProgressInverted: Story = {
    render: () => (
        <div style={{ width: '280px', padding: '1rem', background: '#9b2d7f' }}>
            <ProgressBar
                value={40}
                tone="inverted"
                aria-label="Прогресс урока"
            />
        </div>
    ),
};

export const Loading: Story = {
    render: () => <Spinner label="Загрузка" />,
};

/** Hover or focus the trigger; on touch devices tapping it works too. */
export const TooltipOnIcon: Story = {
    render: () => <HintTooltip text="Подсказка к заданию" />,
};

export const TooltipOnCustomTrigger: Story = {
    render: () => (
        <Tooltip title="Урок заблокирован">
            <IconButton aria-label="lock">🔒</IconButton>
        </Tooltip>
    ),
};

/** Floating action button used by the About panel. */
export const FloatingAction: Story = {
    render: () => <Fab aria-label="about">?</Fab>,
};
