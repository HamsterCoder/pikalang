import type { Meta, StoryObj } from '@storybook/react-vite';

import { Alert } from '@components/ui/Alert';

const meta = {
    title: 'UI/Alert',
    component: Alert,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
} satisfies Meta<typeof Alert>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Shown after a correct answer. */
export const Success: Story = {
    args: {
        severity: 'success',
        title: 'Все верно.',
        children: 'Другой вариант ответа: Zdravo!',
    },
};

/** Shown after an incorrect answer, with the expected answer. */
export const Error: Story = {
    args: {
        severity: 'error',
        title: 'Неверно.',
        children: 'Ожидаемый ответ: Prijatno!',
    },
};

export const TitleOnly: Story = {
    args: {
        severity: 'success',
        title: 'Все верно.',
    },
};
