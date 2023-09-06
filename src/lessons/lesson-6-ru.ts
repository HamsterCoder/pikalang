import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// TARGET WORDS: Dobro jutro, Dobar dan, Dobro veće, Laku noć, Ćao, Zdravo, Vidimo se, Prijatno, Doviđenja
// SECONDARY WORDS: ...

export const description: LessonDescription = {
    id: 'conversation/greetings-1',
    name: 'greetings-1',
    displayName: 'Приветствия',
    topic: 'conversation',
    displayTopic: 'Разговор',
    image: 'greetings',
    description: 'Учим приветсвия',
};

export const challenges: ChallengeDescription[] = [
    // Easy translate Russian -> Serbian
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Привет',
            answer: ['Ćao', 'Zdravo'],
            chips: ['Zdravo', 'Ćao'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Пока',
            answer: ['Ćao', 'Zdravo'],
            chips: ['Zdravo', 'Ćao'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Добрый день',
            answer: ['Dobar dan'],
            chips: ['Dobar', 'jutro', 'dan', 'Dobro'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Доброе утро',
            answer: ['Dobro jutro'],
            chips: ['Dobar', 'Dobro', 'jutro', 'veće'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Добрый вечер',
            answer: ['Dobro veće'],
            chips: ['Dobro', 'dan', 'Dobar', 'veće'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Спокойной ночи',
            answer: ['Laku noć'],
            chips: ['Laku', 'Dobra', 'noć'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Увидимся',
            answer: ['Vidimo se'],
            chips: ['Vidimo', 'se', 'Doviđenja'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Удачи',
            answer: ['Prijatno'],
            chips: ['Prijatno', 'Doviđenja'],
        },
    },
    // Mini conversations
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Dobar dan!',
            questionHint: 'Добрый день',
            answer: ['Dobar dan!', 'Zdravo!'],
            chips: ['Zdravo!', 'Dobar', 'dan!'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Dobro jutro!',
            questionHint: 'Доброе утро',
            answer: ['Dobro jutro!', 'Zdravo!'],
            chips: ['Zdravo!', 'Dobro', 'jutro!'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Dobro veće!',
            questionHint: 'Добрый вечер',
            answer: ['Dobro veće!', 'Zdravo!'],
            chips: ['Zdravo!', 'Dobro', 'veće!'],
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Doviđenja!',
            questionHint: 'До свидания',
            answer: ['Prijatno!', 'Doviđenja!'],
            chips: ['Prijatno!', 'Doviđenja!'],
        },
    },
];
