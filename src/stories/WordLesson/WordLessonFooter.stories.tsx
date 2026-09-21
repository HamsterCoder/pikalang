import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { MemoryRouter } from 'react-router';

import { WordLessonFooter } from '@components/WordLesson/WordLessonFooter';

const meta = {
    title: 'WordLesson/WordLessonFooter',
    component: WordLessonFooter,
    parameters: {
        layout: 'fullscreen',
    },
    tags: ['autodocs'],
    args: {
        lifecycle: 'word',
        onKnown: fn(),
        onContinue: fn(),
    },
    decorators: [
        (Story) => (
            <MemoryRouter>
                <Story />
            </MemoryRouter>
        ),
    ],
} satisfies Meta<typeof WordLessonFooter>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A new word on screen: read it, or say you already know it. */
export const NewWord: Story = {};

/** The matching round has no controls — only how much is left. */
export const Matching: Story = {
    args: { lifecycle: 'match', pairsLeft: 3 },
};

/** The last pair. */
export const LastPair: Story = {
    args: { lifecycle: 'match', pairsLeft: 1 },
};

/** The result screen, with the way back to the library. */
export const Complete: Story = { args: { lifecycle: 'complete' } };
