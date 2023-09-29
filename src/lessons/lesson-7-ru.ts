import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// TARGET WORDS: Da li govorite, engleski, ruski, srpski, govorim,
// SECONDARY WORDS: izvenite, loše, dobro, sporije,

export const description: LessonDescription = {
    id: 'conversation/languages',
    name: 'languages',
    displayName: 'Языки',
    topic: 'conversation',
    displayTopic: 'Разговор',
    image: '',
    description: 'Говорите ли вы по английски?',
};

export const challenges: ChallengeDescription[] = [
    // Ask
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li govorite engleski?',
            answer: ['Вы говорите по английски?'],
            chips: ['Вы', 'говорите', 'по', 'английски?', 'сербски?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li govorite ruski?',
            answer: ['Вы говорите по русски?'],
            chips: ['Вы', 'говорите', 'по', 'сербски?', 'русски?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li govorite srpski?',
            answer: ['Вы говорите по сербски?'],
            chips: ['Вы', 'говорите', 'по', 'сербски?', 'русски?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Я учу сербский',
            answer: ['Učim srpski', 'Ja učim srpski'],
            chips: ['Učim', 'srpski', 'Ja', 'učite'],
        },
    },
    // Answer
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Я говорю по сербски плохо',
            answer: ['Govorim srpski loše', 'Ja govorim srpski loše'],
            chips: ['Govorim', 'srpski', 'loše', 'dobro', 'Ja'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Я говорю по английски хорошо',
            answer: ['Govorim engleski dobro', 'Ja govorim engleski dobro'],
            chips: ['Govorim', 'srpski', 'engleski', 'loše', 'dobro', 'Ja'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Я говорю только по русски',
            answer: ['Govorim samo ruski', 'Ja govorim samo ruski'],
            chips: ['Govorim', 'srpski', 'ruski', 'samo', 'Ja', 'dobro'],
        },
    },
    // Harder phrases
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li možete da govorite sporije',
            answer: ['Вы можете говорить медленней?'],
            chips: ['Вы', 'можете', 'говорить', 'медленней?', 'быстрее?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Izvinite, ne govorim srpski',
            answer: [
                'Простите, я не говорю по сербски',
                'Простите, не говорю по сербски',
            ],
            chips: [
                'Простите,',
                'я',
                'не',
                'говорю',
                'по',
                'сербски',
                'понимаю',
            ],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Ućim srpski, ali govorim loše',
            answer: [
                'Я учу сербский, но говорю плохо',
                'Я учу сербский, но плохо говорю',
            ],
            chips: ['Я', 'учу', 'сербский,', 'но', 'говорю', 'плохо', 'хорошо'],
        },
    },
];
