import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// NEW WORDS: tomato, cucumber, potato, pepper
// NEW PHRASES: Šta je ovo?, Ovo je..., Ovo su...

export const description: LessonDescription = {
    id: 'food/vegetables-1',
    name: 'vegetables-1',
    displayName: 'Овощи 1',
    topic: 'food',
    displayTopic: 'Еда',
    image: 'vegetables',
    description: 'Учим названия некоторых овощей',
};

const tomatoChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
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
            questionHint: 'Что это?',
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

const potatoChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
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

const pepperChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je paprika'],
            chips: ['Ovo', 'paprika', 'krastavac', 'je'],
            image: 'sweet-pepper',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'paprika',
            images: ['sweet-pepper', 'cucumber', 'courgette'],
        },
    },
];

export const challenges: ChallengeDescription[] = [
    ...tomatoChallenges,
    ...cucumberChallenges,
    ...pepperChallenges,
    ...potatoChallenges,
];
