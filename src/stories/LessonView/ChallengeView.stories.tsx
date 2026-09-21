import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { ChallengeView } from '@components/LessonView/ChallengeView';
import { ChallengeType } from '@lessons/types';

import type { ChallengeDescription } from '@lessons/types';
import type { ChallengeAnswer } from '@components/LessonView/types';

/**
 * The views are controlled by the lesson shell, so the story holds the answer
 * on their behalf and the challenge stays playable here.
 */
const Playable = ({
    challenge,
    locked,
}: {
    challenge: ChallengeDescription;
    locked: boolean;
}) => {
    const [answer, setAnswer] = useState<ChallengeAnswer>([]);

    return (
        <div style={{ maxWidth: '40rem', display: 'grid', gap: '1.25rem' }}>
            <ChallengeView
                challenge={challenge}
                answer={answer}
                locked={locked}
                onAnswerChange={setAnswer}
            />
        </div>
    );
};

const meta = {
    title: 'LessonView/ChallengeView',
    component: Playable,
    parameters: {
        layout: 'padded',
    },
    tags: ['autodocs'],
    args: {
        locked: false,
    },
} satisfies Meta<typeof Playable>;

export default meta;

type Story = StoryObj<typeof meta>;

export const TranslateChips: Story = {
    args: {
        challenge: {
            type: ChallengeType.TRANSLATE_CHIPS,
            data: {
                sentence: 'Кофе в чашке.',
                answer: ['Kafa je u šolji'],
                wrongChips: ['čaši', 'flaši'],
            },
        },
    },
};

export const QuestionChips: Story = {
    args: {
        challenge: {
            type: ChallengeType.QUESTION_CHIPS,
            data: {
                image: 'sweet-pepper',
                question: 'Šta je ovo?',
                questionHint: 'Что это?',
                answer: ['Ovo je paprika'],
                chips: ['Ovo', 'paprika', 'krastavac', 'je'],
            },
        },
    },
};

export const InsertChips: Story = {
    args: {
        challenge: {
            type: ChallengeType.INSERT_CHIPS,
            data: {
                sentence: 'Beograd {nije} mali grad.',
                translation: 'Белград не маленький город.',
                chips: ['nije', 'nismo'],
            },
        },
    },
};

export const WordPicture: Story = {
    args: {
        challenge: {
            type: ChallengeType.WORD_PICTURE,
            data: {
                word: 'šolja',
                images: ['glass', 'bottle', 'cup', 'plate'],
            },
        },
    },
};

/** Once the answer is checked, nothing on the challenge can be changed. */
export const Locked: Story = {
    args: { ...WordPicture.args, locked: true },
};
