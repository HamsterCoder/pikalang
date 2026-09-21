import type { Meta, StoryObj } from '@storybook/react-vite';

import { WordCard } from '@components/WordLesson/WordCard';

const meta = {
    title: 'WordLesson/WordCard',
    component: WordCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        word: 'paradajz',
        translation: 'помидор',
        image: 'tomato',
        gender: 'm',
        example: 'Paradajz je crven i sočan.',
        exampleTranslation: 'Помидор красный и сочный.',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof WordCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** A new word as the learner first meets it. */
export const Masculine: Story = {};

export const Feminine: Story = {
    args: {
        word: 'šargarepa',
        translation: 'морковь',
        image: 'carrot',
        gender: 'f',
        example: 'Šargarepa je slatka.',
        exampleTranslation: 'Морковь сладкая.',
    },
};

/** Words worth a note of their own carry a second panel under the example. */
export const WithTip: Story = {
    args: {
        word: 'jagoda',
        translation: 'клубника',
        image: 'strawberry',
        gender: 'f',
        example: 'Jagoda miriše na leto.',
        exampleTranslation: 'Клубника пахнет летом.',
        tip: 'Ложный друг: jagoda — именно клубника, а ягода вообще — bobica.',
    },
};

/** The card at phone width, where the illustration steps down a size. */
export const Narrow: Story = {
    args: {
        word: 'kašičica',
        translation: 'чайная ложка',
        image: 'teaspoon',
        gender: 'f',
        example: 'Kašičica je mala kašika.',
        exampleTranslation: 'Чайная ложка — это маленькая ложка.',
        tip: 'Суффикс -ica снова делает слово меньше: kašika → kašičica.',
    },
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
