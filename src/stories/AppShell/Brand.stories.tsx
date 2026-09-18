import type { Meta, StoryObj } from '@storybook/react-vite';

import { Brand } from '@components/AppHeader/Brand';

const meta = {
    title: 'AppHeader/Brand',
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

/** The subtitle slot is there for when a second course ships. */
export const WithCourse: Story = {
    args: { subtitle: 'Сербский курс' },
};
