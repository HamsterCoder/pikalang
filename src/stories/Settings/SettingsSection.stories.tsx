import type { Meta, StoryObj } from '@storybook/react-vite';

import { SettingRow } from '@components/Settings/SettingRow';
import { SettingsSection } from '@components/Settings/SettingsSection';
import { Switch } from '@components/ui/Switch';

const hotkeys = (
    <SettingRow
        key="hotkeys"
        label="Горячие клавиши"
        description="Показывать клавишу рядом с каждой плиткой в упражнении на пары."
    >
        {({ labelId, descriptionId }) => (
            <Switch
                checked={false}
                onCheckedChange={() => {}}
                aria-labelledby={labelId}
                aria-describedby={descriptionId}
            />
        )}
    </SettingRow>
);

const sound = (
    <SettingRow key="sound" label="Звук в уроках">
        {({ labelId }) => (
            <Switch
                checked
                onCheckedChange={() => {}}
                aria-labelledby={labelId}
            />
        )}
    </SettingRow>
);

const meta = {
    title: 'Settings/SettingsSection',
    component: SettingsSection,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        title: 'Процесс обучения',
        description: 'Что уроки предлагают вам во время прохождения.',
        children: hotkeys,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '36rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SettingsSection>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The only group there is so far: one setting under one heading. */
export const OneSetting: Story = {};

/** Rows are divided rather than boxed one by one, so a group reads as a group. */
export const SeveralSettings: Story = {
    args: { children: [hotkeys, sound] },
};

/** A group whose heading says enough on its own. */
export const WithoutDescription: Story = {
    args: { description: undefined, children: [hotkeys, sound] },
};
