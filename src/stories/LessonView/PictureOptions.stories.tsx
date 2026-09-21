import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { PictureOptions } from '@components/LessonView/PictureOptions';
import { SettingsContext } from '@routes/SettingsContext';

const meta = {
    title: 'LessonView/PictureOptions',
    component: PictureOptions,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        images: ['glass', 'bottle', 'cup', 'plate'],
        selected: null,
        onSelect: fn(),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof PictureOptions>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The options carry no captions: naming them would give the answer away. */
export const Undecided: Story = {};

export const Chosen: Story = {
    args: { selected: 'cup' },
};

export const Locked: Story = {
    args: { selected: 'cup', disabled: true },
};

/**
 * With keyboard shortcuts turned on in the settings, each option shows the
 * digit that picks it. They are off by default, so every story above has none.
 */
export const WithShortcuts: Story = {
    decorators: [
        (Story) => (
            <SettingsContext.Provider
                value={{ settings: { hotkeys: true }, setSetting: () => {} }}
            >
                <Story />
            </SettingsContext.Provider>
        ),
    ],
};
