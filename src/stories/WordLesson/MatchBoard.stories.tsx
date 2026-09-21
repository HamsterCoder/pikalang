import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { MatchBoard } from '@components/WordLesson/MatchBoard';
import { SettingsContext } from '@routes/SettingsContext';

const vegetables = [
    {
        id: 'paradajz',
        word: 'paradajz',
        translation: 'помидор',
        caption: 'мужской род',
    },
    {
        id: 'krastavac',
        word: 'krastavac',
        translation: 'огурец',
        caption: 'мужской род',
    },
    {
        id: 'krompir',
        word: 'krompir',
        translation: 'картофель',
        caption: 'мужской род',
    },
    {
        id: 'paprika',
        word: 'paprika',
        translation: 'сладкий перец',
        caption: 'женский род',
    },
];

const meta = {
    title: 'WordLesson/MatchBoard',
    component: MatchBoard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        words: vegetables,
        onPairMatched: fn(),
        onMistake: fn(),
        onComplete: fn(),
    },
    decorators: [
        (Story) => (
            <div
                style={{
                    containerType: 'inline-size',
                    containerName: 'lesson',
                    maxWidth: '40rem',
                }}
            >
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof MatchBoard>;

export default meta;

type Story = StoryObj<typeof meta>;

/**
 * The board is playable here: pick a Serbian word, then its translation. A
 * wrong guess flashes and costs the pair its star.
 */
export const FourPairs: Story = {};

/** Topics with six words split into sets of three rather than a four and a pair. */
export const ThreePairs: Story = {
    args: { words: vegetables.slice(0, 3) },
};

/**
 * With the shortcuts turned on in the settings, every tile advertises its key
 * and the keys start answering. With the setting off — every other story here
 * — neither happens.
 */
export const WithHotkeys: Story = {
    decorators: [
        (Story) => (
            <SettingsContext.Provider
                value={{
                    settings: { hotkeys: true },
                    setSetting: () => {},
                }}
            >
                <Story />
            </SettingsContext.Provider>
        ),
    ],
};

/** At phone width the columns tighten instead of stacking. */
export const Narrow: Story = {
    decorators: [
        (Story) => (
            <div
                style={{
                    containerType: 'inline-size',
                    containerName: 'lesson',
                    maxWidth: '22rem',
                }}
            >
                <Story />
            </div>
        ),
    ],
};
