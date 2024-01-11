import type { Meta, StoryObj } from '@storybook/react';

import { MobileNavigation } from '@components/Navigation/MobileNavigation';

const meta = {
    title: 'Navigation/Mobile',
    component: MobileNavigation,
    parameters: {
        layout: 'centered',
        backgrounds: { default: 'accent' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof MobileNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

// TODO figure out why useMatches works differently here
// TODO why are there no hovers when the menu slides down (z-index: -1)

export const Default: Story = {
    args: {
        links: [
            {
                to: '/lessons/',
                labelKey: 'lessons',
            },
            {
                to: '/conversations/',
                labelKey: 'conversations',
            },
            {
                to: '/words/',
                labelKey: 'words',
                disabled: true,
            },
        ],
    },
};
