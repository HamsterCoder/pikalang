import type { Meta, StoryObj } from '@storybook/react-vite';

import { AppHeader } from '@components/AppHeader/AppHeader';
import { EnvContext } from '@routes/EnvContext';

const meta = {
    title: 'AppHeader/AppHeader',
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

/** Brand, destinations, active course and the experience counter. */
export const Desktop: Story = {};

export const NoProgress: Story = {
    args: { xp: 0 },
};

export const LargeCount: Story = {
    args: { xp: 1420 },
};

/**
 * Under 840px the destinations move to a bottom dock, leaving the bar with the
 * brand and the counter. `EnvContext` is what makes the switch, so the story
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
