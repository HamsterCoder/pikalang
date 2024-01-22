import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// NEW WORDS: cabbage(kupus), courgette(tikvica), carrot(šargarepa), pumpkin (bundeva)
// NEW PHRASES: Šta je ovo?, Ovo je..., Ovo su...
// Koliko košta kupus
// Koliko košta šargarepa

export const description: LessonDescription = {
    id: 'food/vegetables-2',
    name: 'vegetables-2',
    displayName: 'Овощи 2',
    topic: 'food',
    displayTopic: 'Еда',
    image: 'vegetables',
    description: 'Продолжаем учить названия овощей',
};

const cabbageChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je kupus'],
            chips: ['Ovo', 'krastavac', 'kupus', 'je'],
            image: 'cabbage',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'kupus',
            images: ['tomato', 'courgette', 'cabbage'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Сколько стоит капуста?',
            answer: ['Koliko košta kupus?'],
            wrongChips: ['šargarepa?'],
        },
    },
];

const courgetteChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je tikvica'],
            chips: ['Ovo', 'krompir', 'tikvica', 'je'],
            image: 'courgette',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'tikvica',
            images: ['courgette', 'cucumber', 'potato'],
        },
    },
];

const carrotChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je šargarepa'],
            chips: ['Ovo', 'šargarepa', 'tikvica', 'je'],
            image: 'carrot',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'šargarepa',
            images: ['courgette', 'cucumber', 'carrot'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Сколько стоит морковь?',
            answer: ['Koliko košta šargarepa?'],
            wrongChips: ['paradajz?'],
        },
    },
];

const pumpkinChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je bundeva'],
            chips: ['Ovo', 'šargarepa', 'bundeva', 'je'],
            image: 'pumpkin',
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'bundeva',
            images: ['courgette', 'pumpkin', 'carrot'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Сколько стоит тыква?',
            answer: ['Koliko košta bundeva?'],
            wrongChips: ['tikvica?'],
        },
    },
];

export const challenges: ChallengeDescription[] = [
    ...cabbageChallenges,
    ...courgetteChallenges,
    ...carrotChallenges,
    ...pumpkinChallenges,
];
