import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { SettingRow } from '@components/Settings/SettingRow';
import { Switch } from '@components/ui/Switch';

const meta = {
    title: 'Settings/SettingRow',
    component: SettingRow,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        label: 'Горячие клавиши',
        description:
            'Показывать клавишу рядом с каждой плиткой в упражнении на пары. Клавиши работают в любом случае.',
        children: ({ labelId, descriptionId }) => (
            <Switch
                checked={false}
                onCheckedChange={() => {}}
                aria-labelledby={labelId}
                aria-describedby={descriptionId}
            />
        ),
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '36rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SettingRow>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A setting with its name, what it does, and the control that changes it. */
export const WithDescription: Story = {};

/** Settings that explain themselves need no second line. */
export const LabelOnly: Story = {
    args: { label: 'Звук в уроках', description: undefined },
};

/** Driven, to check the row and its switch stay tied together. */
export const Interactive: Story = {
    render: function Interactive(args) {
        const [checked, setChecked] = useState(false);

        return (
            <SettingRow {...args}>
                {({ labelId, descriptionId }) => (
                    <Switch
                        checked={checked}
                        onCheckedChange={setChecked}
                        aria-labelledby={labelId}
                        aria-describedby={descriptionId}
                    />
                )}
            </SettingRow>
        );
    },
};
