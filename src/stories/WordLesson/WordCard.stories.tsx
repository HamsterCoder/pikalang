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

/**
 * Every word carries a note under its example. They are all about stress for
 * now: the one thing neither the spelling nor the translation gives away.
 */
export const WithTip: Story = {
    args: {
        word: 'jagoda',
        translation: 'клубника',
        image: 'strawberry',
        gender: 'f',
        example: 'Jagoda miriše na leto.',
        exampleTranslation: 'Клубника пахнет летом.',
        tip: 'Ударение на первый слог: JA-go-da.',
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
        tip: 'Ударение на первый слог: KA-ši-či-ca.',
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
