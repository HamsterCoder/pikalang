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
            answer: 'blueberry',
            images: ['strawberry', 'raspberry', 'blueberry'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
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
            questionHint: 'Что это?',
            answer: ['Ovo je malina'],
            chips: ['Ovo', 'malina', 'jagoda', 'je'],
            image: 'raspberry',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ovo je malina',
            answer: ['Это малина'],
            chips: ['малина', 'клубника', 'Это'],
        },
    },
];

const strawberryChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'jagoda',
            answer: 'strawberry',
            images: ['raspberry', 'blueberry', 'strawberry'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
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
            questionHint: 'Что это?',
            answer: ['Ovo je kupina'],
            chips: ['Ovo', 'malina', 'kupina', 'je'],
            image: 'blackberry',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ovo je kupina',
            answer: ['Это ежевика'],
            chips: ['ежевика', 'Это', 'голубика'],
        },
    },
];

const combinedChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ovo su jagoda i malina',
            answer: ['Это клубника и малина'],
            chips: ['Голубика', 'это', 'малина', 'и', 'клублника'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Jagoda je crvena i kupina je crna',
            answer: ['Клубника красная и ежевика черная'],
            chips: ['красная', 'Клубника', 'ежевика', 'и', 'черная'],
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
