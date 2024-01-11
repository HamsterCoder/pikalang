import type { Meta, StoryObj } from '@storybook/react';

import { DesktopNavigation } from '@components/Navigation/DesktopNavigation';

const meta = {
    title: 'Navigation/Desktop',
    component: DesktopNavigation,
    parameters: {
        layout: 'centered',
        backgrounds: { default: 'accent' },
    },
    tags: ['autodocs'],
} satisfies Meta<typeof DesktopNavigation>;

export default meta;

type Story = StoryObj<typeof meta>;

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
