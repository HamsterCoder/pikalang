import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Switch } from '@components/ui/Switch';

const meta = {
    title: 'UI/Switch',
    component: Switch,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    args: {
        checked: false,
        onCheckedChange: fn(),
        'aria-label': 'Горячие клавиши',
    },
} satisfies Meta<typeof Switch>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Off, which is where a new setting starts unless there is a reason not to. */
export const Off: Story = {};

export const On: Story = { args: { checked: true } };

export const Disabled: Story = { args: { disabled: true } };

export const DisabledOn: Story = { args: { checked: true, disabled: true } };

/** Driven, to check the thumb travels as it should. */
export const Interactive: Story = {
    render: function Interactive(args) {
        const [checked, setChecked] = useState(false);

        return (
            <Switch {...args} checked={checked} onCheckedChange={setChecked} />
        );
    },
};
