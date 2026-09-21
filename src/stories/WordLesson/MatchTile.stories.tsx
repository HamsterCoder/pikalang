import type { Meta, StoryObj } from '@storybook/react-vite';

import { MatchTile } from '@components/WordLesson/MatchTile';

const meta = {
    title: 'WordLesson/MatchTile',
    component: MatchTile,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        children: 'paradajz',
        state: 'idle',
        tone: 'serbian',
        caption: 'мужской род',
        hotkey: '1',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '16rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MatchTile>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Waiting to be picked. */
export const Idle: Story = {};

/** Picked, waiting for something in the other column. */
export const Selected: Story = { args: { state: 'selected' } };

/** Paired up and out of play. */
export const Matched: Story = { args: { state: 'matched' } };

/** A wrong guess, lit for a moment before the board lets go of it. */
export const Wrong: Story = { args: { state: 'wrong' } };

/** The Russian column reads at a lighter weight and carries no gender. */
export const Russian: Story = {
    args: {
        children: 'помидор',
        tone: 'russian',
        caption: undefined,
        hotkey: 'Q',
    },
};

/** A long translation wraps rather than pushing the column wider. */
export const LongLabel: Story = {
    args: {
        children: 'чайная ложка',
        tone: 'russian',
        caption: undefined,
        hotkey: 'W',
    },
};

/**
 * The hotkey badge only appears where there is a keyboard for it, so it needs
 * the lesson container to be wide enough.
 */
export const WithHotkey: Story = {
    decorators: [
        (Story) => (
            <div
                style={{
                    containerType: 'inline-size',
                    containerName: 'lesson',
                    width: '34rem',
                }}
            >
                <div style={{ maxWidth: '16rem' }}>
                    <Story />
                </div>
            </div>
        ),
    ],
};
