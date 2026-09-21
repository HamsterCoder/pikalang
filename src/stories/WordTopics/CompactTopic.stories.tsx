import type { Meta, StoryObj } from '@storybook/react-vite';

import { CompactTopic } from '@components/WordTopics/CompactTopic';

const meta = {
    title: 'WordTopics/CompactTopic',
    component: CompactTopic,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        state: 'untouched',
        displayName: 'Овощи',
        image: 'sweet-pepper',
        to: '/words/vegetables/1/',
        setCount: 2,
        completedSets: 0,
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '22rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof CompactTopic>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A topic the learner has not opened yet. */
export const Untouched: Story = {};

/** The one in the middle of being worked through carries the accent. */
export const Started: Story = {
    args: { state: 'started', completedSets: 1 },
};

/** Finished: the cover gives way to a tick, as on the lesson path. */
export const Completed: Story = {
    args: {
        state: 'completed',
        displayName: 'Ягоды',
        image: 'strawberry',
        to: '/words/berries/1/',
        completedSets: 2,
    },
};

/** A long name is cut rather than allowed to push the progress off the row. */
export const LongName: Story = {
    args: { displayName: 'Посуда и кухонные приборы', image: 'cup' },
};

/** The rows as the phone actually stacks them, in their shared panel. */
export const InAList: Story = {
    render: (args) => (
        <ul
            style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '0.15rem',
                margin: 0,
                padding: '0.5rem',
                border: '1px solid rgba(125, 10, 96, 0.14)',
                borderRadius: '16px',
                background: '#ffffff',
                listStyle: 'none',
            }}
        >
            <li>
                <CompactTopic {...args} />
            </li>
            <li>
                <CompactTopic
                    {...args}
                    state="started"
                    displayName="Фрукты"
                    image="apple"
                    to="/words/fruit/2/"
                    completedSets={1}
                />
            </li>
            <li>
                <CompactTopic
                    {...args}
                    state="completed"
                    displayName="Ягоды"
                    image="strawberry"
                    to="/words/berries/1/"
                    completedSets={2}
                />
            </li>
        </ul>
    ),
};
