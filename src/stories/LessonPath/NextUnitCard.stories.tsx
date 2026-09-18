import type { Meta, StoryObj } from '@storybook/react-vite';

import { NextUnitCard, PathEnd } from '@components/LessonPath/NextUnitCard';

const meta = {
    title: 'LessonPath/NextUnitCard',
    component: NextUnitCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        title: 'Еда',
        lessonCount: 6,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '44rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof NextUnitCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** Closes a section by pointing at what comes next. */
export const Default: Story = {};

export const SingleLesson: Story = {
    args: { title: 'Полезные глаголы', lessonCount: 1 },
};

/** Shown after the last section, where there is nothing left to preview. */
export const EndOfPath: Story = {
    render: () => <PathEnd />,
};
