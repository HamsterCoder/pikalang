import type { Meta, StoryObj } from '@storybook/react-vite';

import { SideNav } from '@components/AppShell/SideNav';
import { MobileDock } from '@components/AppShell/MobileDock';
import { appNavLinks } from '@components/AppShell/navLinks';

const meta = {
    title: 'AppShell/Navigation',
    component: SideNav,
    parameters: {
        layout: 'fullscreen',
        initialRoute: '/path/',
    },
    tags: ['autodocs'],
    args: {
        links: appNavLinks,
    },
    decorators: [
        (Story) => (
            <div style={{ minHeight: '22rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SideNav>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The wide layout. Destinations live here rather than in the top bar, which
 * leaves the bar for the learner's own state. The active one gets accent text
 * on a tinted pill plus the marker bar, so it does not rely on colour alone.
 */
export const Rail: Story = {};

/** "Слова" is disabled until the screen exists: a span, not a dead link. */
export const WithoutUpcoming: Story = {
    args: { links: appNavLinks.filter((link) => !link.disabled) },
};

/** The phone layout, fixed to the bottom of the preview frame. */
export const Dock: Story = {
    render: (args) => <MobileDock {...args} />,
};
