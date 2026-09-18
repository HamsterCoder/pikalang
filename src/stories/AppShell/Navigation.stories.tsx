import type { Meta, StoryObj } from '@storybook/react-vite';

import { HeaderNav } from '@components/AppHeader/HeaderNav';
import { MobileDock } from '@components/AppHeader/MobileDock';
import { appNavLinks } from '@components/AppHeader/navLinks';

const meta = {
    title: 'AppHeader/Navigation',
    component: HeaderNav,
    parameters: {
        layout: 'padded',
        initialRoute: '/path/',
    },
    tags: ['autodocs'],
    args: {
        links: appNavLinks,
    },
} satisfies Meta<typeof HeaderNav>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The active destination gets accent text on a tinted pill plus the marker bar,
 * so it does not rely on colour alone.
 */
export const Header: Story = {};

/** "Слова" is disabled until the screen exists: a span, not a dead link. */
export const WithoutUpcoming: Story = {
    args: { links: appNavLinks.filter((link) => !link.disabled) },
};

/** The phone layout. It is fixed to the bottom of the preview frame. */
export const Dock: Story = {
    render: (args) => <MobileDock {...args} />,
    decorators: [
        (Story) => (
            <div style={{ minHeight: '12rem' }}>
                <Story />
            </div>
        ),
    ],
};
