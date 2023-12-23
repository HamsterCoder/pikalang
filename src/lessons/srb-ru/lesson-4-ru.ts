import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// TARGET WORDS: ja sam, ti si, on/ona/one je, mi smo, vi ste, oni/one/ona su
// SECONDARY WORDS:
// umoran, spreman, srećan, lep
// porodica, drug, drugovi, drugarica, drugarice, prijatelji, prijateljnice, deca

// Ja ✅ | Mi ✅ ✅
// Ti ✅ | Vi ✅ ✅
// On ✅ | Oni ✅ ✅
// Ona ✅| One ✅ ✅
// Ono ✅ | Ona ✅

export const description: LessonDescription = {
    id: 'verb/jesam',
    name: 'jesam',
    displayName: 'jesam', // i18n
    topic: 'verb',
    displayTopic: 'Глагол', // i18n
    image: 'verb',
    description: 'Спрягаем вспомогательный глагол jesam', // i18n
};

const combinedChallenges: ChallengeDescription[] = [
    // Singular
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Ja {sam} umoran.',
            translation: 'Я устал(а).',
            chips: ['sam', 'si', 'smo'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Ti {si} srećan.',
            translation: 'Ты счастлив(а).',
            chips: ['si', 'ste', 'je'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'On {je} spreman.',
            translation: 'Он готов.',
            chips: ['je', 'sam', 'su'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Ona {je} moja drugarica.',
            translation: 'Она моя приятельница.',
            chips: ['je', 'su', 'si'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Ono {je} lepo.',
            translation: 'Оно красивое.',
            chips: ['je', 'si', 'su'],
        },
    },
    // Plural
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Mi {smo} porodica.',
            translation: 'Мы семья.',
            chips: ['smo', 'su', 'sam'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Vi {ste} porodica.',
            translation: 'Вы ceмья.',
            chips: ['ste', 'su', 'si'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Oni {su} drugovi.',
            translation: 'Они приятели.',
            chips: ['su', 'ste', 'je'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'One {su} prijateljnice.',
            translation: 'Они подруги.',
            chips: ['su', 'ste', 'je'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Ona {su} deca.',
            translation: 'Они дети.',
            chips: ['su', 'ste', 'je'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Mi {smo} porodica. Oni {su} prijatelji.',
            translation: 'Мы семья. Они друзья.',
            chips: ['smo', 'su'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Vi {ste} deca. One {su} drugarice.',
            translation: 'Мы семья. Они приятельницы.',
            chips: ['ste', 'su'],
        },
    },
];

export const challenges: ChallengeDescription[] = [...combinedChallenges];
