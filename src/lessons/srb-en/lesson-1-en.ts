import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';

// NEW WORDS: tomato, cucumber, potato, pepper
// NEW PHRASES: Šta je ovo?, Ovo je..., Ovo su...

const tomatoChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je paradajz'],
            chips: ['Ovo', 'krastavac', 'paradajz', 'je'],
            image: 'tomato',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'paradajz',
            images: ['tomato', 'courgette', 'potato'],
        },
    },
];

const cucumberChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je krastavac'],
            chips: ['Ovo', 'krompir', 'krastavac', 'je'],
            image: 'cucumber',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'krastavac',
            images: ['tomato', 'cucumber', 'potato'],
        },
    },
];

const pepperChalllenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je krompir'],
            chips: ['Ovo', 'krompir', 'paradajz', 'je'],
            image: 'potato',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'krompir',
            images: ['potato', 'cucumber', 'tomato'],
        },
    },
];

const potatoChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je paprika'],
            chips: ['Ovo', 'paprika', 'krastavac', 'je'],
            image: 'pepper',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'paprika',
            images: ['pepper', 'cucumber', 'courgette'],
        },
    },
];

export const challenges: ChallengeDescription[] = [
    ...tomatoChallenges,
    ...cucumberChallenges,
    ...pepperChalllenges,
    ...potatoChallenges,
];
