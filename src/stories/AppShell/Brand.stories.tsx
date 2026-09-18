import type { Meta, StoryObj } from '@storybook/react-vite';

import { Brand } from '@components/AppShell/Brand';

const meta = {
    title: 'AppShell/Brand',
    component: Brand,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Brand>;

export default meta;

type Story = StoryObj<typeof meta>;

/** What the header uses: mark plus wordmark, linking home. */
export const Default: Story = {};

/** How the left rail renders it: wordmark over the active course. */
export const WithCourse: Story = {
    args: { subtitle: 'Курс сербского' },
};
