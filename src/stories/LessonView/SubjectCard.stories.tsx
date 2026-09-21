import type { Meta, StoryObj } from '@storybook/react-vite';

import { SubjectCard } from '@components/LessonView/SubjectCard';
import { PictureImage } from '@components/Picture/PictureImage';

const meta = {
    title: 'LessonView/SubjectCard',
    component: SubjectCard,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        children: 'Kafa je u šolji.',
    },
    decorators: [
        (Story) => (
            <div style={{ maxWidth: '40rem' }}>
                <Story />
            </div>
        ),
    ],
} satisfies Meta<typeof SubjectCard>;

export default meta;

type Story = StoryObj<typeof meta>;

/** The sentence, question or word the challenge is about. */
export const Sentence: Story = {};

export const WithCaption: Story = {
    args: { caption: 'Нажимайте на слова ниже, чтобы перевести' },
};

/** Question challenges can name a picture instead of describing it. */
export const WithIllustration: Story = {
    args: {
        children: 'Šta je ovo?',
        illustration: (
            <div style={{ width: '10rem', height: '10rem' }}>
                <PictureImage image="sweet-pepper" />
            </div>
        ),
    },
};
