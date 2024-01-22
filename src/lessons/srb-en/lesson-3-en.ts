import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';

// NEW WORDS: blueberry, raspberry, strawberry, blackberry

const blueberryChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'borovnica',
            images: ['strawberry', 'raspberry', 'blueberry'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je borovnica'],
            chips: ['Ovo', 'borovnica', 'kupina', 'je'],
            image: 'blueberry',
        },
    },
];

const raspberryChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je malina'],
            chips: ['Ovo', 'malina', 'jagoda', 'je'],
            image: 'raspberry',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ovo je malina',
            answer: ['This is a raspberry'],
            chips: ['strawberry', 'is', 'a', 'raspberry', 'This'],
        },
    },
];

const strawberryChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'jagoda',
            images: ['raspberry', 'blueberry', 'strawberry'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je jagoda'],
            chips: ['jagoda', 'malina', 'Ovo', 'je', 'su'],
            image: 'strawberry',
        },
    },
];

const blackberryChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'What is this?',
            answer: ['Ovo je kupina'],
            chips: ['Ovo', 'malina', 'kupina', 'je'],
            image: 'blackberry',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ovo je kupina',
            answer: ['This is a blackberry'],
            chips: ['This', 'strawberry', 'is', 'a', 'blackberry'],
        },
    },
];

const combinedChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ovo su jagoda i malina',
            answer: ['These are a strawberry and a raspberry'],
            chips: [
                'a',
                'This',
                'These',
                'are',
                'and',
                'strawberry',
                'a',
                'raspberry',
                'apple',
            ],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Jagoda je crvena, kupina je crna.',
            answer: ['Strawberry is red and blackberry is black.'],
            chips: [
                'is',
                'red',
                'blackberry',
                'are',
                'and',
                'Strawberry',
                'is',
                'black',
            ],
        },
    },
];

export const challenges: ChallengeDescription[] = [
    ...blackberryChallenges,
    ...strawberryChallenges,
    ...blueberryChallenges,
    ...raspberryChallenges,
    ...combinedChallenges,
];
