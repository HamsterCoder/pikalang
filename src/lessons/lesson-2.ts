import {
    ChallengeDescription,
    ChallengeType,
} from '../components/Challenge/types';

// TARGET WORDS: apple, pear, apricot, peach
// SECONDARY WORDS: crvena, zelena, mala, velika

const appleChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'jabuka',
            answer: 'apple',
            images: ['apple', 'apricot', 'peach'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je jabuka'],
            chips: ['Ovo', 'jabuka', 'kaisija', 'je'],
            image: 'apple',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Яблоко красное',
            answer: ['Jabuka je crvena'],
            chips: ['zelena', 'Jabuka', 'crvena', 'je'],
        },
    },
];

const pearChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'kruška',
            answer: 'pear',
            images: ['pear', 'apricot', 'lemon'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je kruška'],
            chips: ['jabuka', 'Ovo', 'je', 'su', 'kruška'],
            image: 'pear',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Груша зеленая',
            answer: ['kruška je zelena'],
            chips: ['zelena', 'kruška', 'crvena', 'je'],
        },
    },
];

const apricotChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'kaisija',
            answer: 'apricot',
            images: ['apple', 'apricot', 'strawberry'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je kaisija'],
            chips: ['Ovo', 'šljiva', 'kaisija', 'je'],
            image: 'apricot',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Абрикос маленький',
            answer: ['kajsija je mala'],
            chips: ['velika', 'je', 'mala', 'kajsija'],
        },
    },
];

const peachChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'breskva',
            answer: 'peach',
            images: ['pear', 'apricot', 'peach'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo je breskva'],
            chips: ['Ovo', 'breskva', 'jabuka', 'je'],
            image: 'peach',
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Персик большой',
            answer: ['breskva je velika'],
            chips: ['velika', 'je', 'mala', 'breskva'],
        },
    },
];

const combinedChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo su jabuka i kruška', 'Ovo su kruška i jabuka'],
            chips: ['jabuka', 'Ovo', 'je', 'su', 'i', 'kruška'],
            image: 'apple-pear',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Šta je ovo?',
            questionHint: 'Что это?',
            answer: ['Ovo su breskve i kajsije', 'Ovo su kajsije i breskve'],
            chips: ['breskve', 'breskva', 'Ovo', 'je', 'su', 'i', 'kajsije'],
            image: 'apricots-peaches',
        },
    },
];

export const challenges: ChallengeDescription[] = [
    ...appleChallenges,
    ...pearChallenges,
    ...apricotChallenges,
    ...peachChallenges,
    ...combinedChallenges,
];
