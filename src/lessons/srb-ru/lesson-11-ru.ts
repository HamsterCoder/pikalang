import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// NEW WORDS: razumeti
// NEW PHRASES:

export const description: LessonDescription = {
    id: 'verb/understand',
    name: 'understand',
    displayName: 'Razumeti',
    topic: 'verb',
    displayTopic: 'Глагол',
    image: '-',
    description: 'Спряжение глагола "понимать"',
    help: {
        type: 'conjugation',
        data: {
            verb: 'understand',
        },
    },
};

const insertChallenges: ChallengeDescription[] = [
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Ja {razumem} srpski.',
            translation: 'Я понимаю сербский.',
            chips: ['razumem', 'razumeš', 'razumemo'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Da li ti {razumeš} engleski?',
            translation: 'Ты понимаешь английский?',
            chips: ['razume', 'razumeš', 'razumeju'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'On {razume} sve.',
            translation: 'Он понимает всё.',
            chips: ['razumem', 'razumete', 'razume'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Mi {razumemo} malo.',
            translation: 'Мы понимаем мало.',
            chips: ['razumete', 'razumeš', 'razumemo'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Da li vi {razumete} lekciju?',
            translation: 'Вы понимаете урок?',
            chips: ['razumem', 'razumeš', 'razumete'],
        },
    },
    {
        type: ChallengeType.INSERT_CHIPS,
        data: {
            sentence: 'Oni ne {razumeju} lekciju.',
            translation: 'Они не понимают урок.',
            chips: ['razumem', 'razume', 'razumeju'],
        },
    },
];

export const challenges: ChallengeDescription[] = [...insertChallenges];
