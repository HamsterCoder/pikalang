import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppHeader } from '@components/AppShell/AppHeader';
import { EnvContext } from '@routes/EnvContext';

const meta = {
    title: 'AppShell/AppHeader',
    component: AppHeader,
    parameters: {
        layout: 'fullscreen',
        initialRoute: '/path/',
    },
    tags: ['autodocs'],
    args: {
        xp: 37,
    },
} satisfies Meta<typeof AppHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Wide layout: active course on the left, experience on the right. */
export const Desktop: Story = {};

export const NoProgress: Story = {
    args: { xp: 0 },
};

export const LargeCount: Story = {
    args: { xp: 1420 },
};

/**
 * On phones there is no rail to hold the brand, so it moves into the bar and
 * the course pill gives way. `EnvContext` makes the switch, so the story
 * supplies it directly rather than relying on the preview width.
 */
export const Mobile: Story = {
    decorators: [
        (Story) => (
            <EnvContext.Provider value={{ mobile: true }}>
                <div style={{ minHeight: '20rem' }}>
                    <Story />
                </div>
            </EnvContext.Provider>
        ),
    ],
};
