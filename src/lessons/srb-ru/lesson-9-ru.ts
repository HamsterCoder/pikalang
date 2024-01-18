import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// 1. Jabuke su zelene. +
// 2. Paradajz je crven. +
// 3. Krastavac je zelen. +
// 4. Kajsije su narandžaste. +
// 5. Limun je žut. +
// 6. Kruške su zelene. +
// 7. Breskve su narandžaste i crvene. +
// 8. Banane su žute. +
// 9. Borovnica je plava.
// 10. Kupina je crna.

export const description: LessonDescription = {
    id: 'food/colors',
    name: 'colors',
    displayName: 'Цвета',
    topic: 'food',
    displayTopic: 'Еда',
    image: 'vegetables',
    description: 'Учим цвета на примере овощей и фруктов',
};

export const challenges: ChallengeDescription[] = [
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje su jabuke?',
            questionHint: 'Какого цвета яблоки?',
            answer: ['Jabuke su zelene'],
            chips: ['Jabuke', 'su', 'zelene', 'crvene', 'narandžaste'],
            image: 'apples-green',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje je paradajz?',
            questionHint: 'Какого цвета помидор?',
            answer: ['Paradajz je crven'],
            chips: ['Paradajz', 'je', 'crven', 'zelen', 'narandžast'],
            image: 'tomato',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje je krastavac?',
            questionHint: 'Какого цвета огурец?',
            answer: ['Krastavac je zelen'],
            chips: ['Krastavac', 'je', 'zelen', 'žut', 'plav'],
            image: 'cucumber',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje su kajsije?',
            questionHint: 'Какого цвета абрикосы?',
            answer: ['Kajsije su narandžaste'],
            chips: ['Kajsije', 'su', 'narandžaste', 'crvene', 'žute'],
            image: 'apricots',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje je limun?',
            questionHint: 'Какого цвета лимон?',
            answer: ['Limun je žut'],
            chips: ['Limun', 'je', 'žut', 'zelen', 'crven'],
            image: 'lemon',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje su kruške?',
            questionHint: 'Какого цвета груши?',
            answer: ['Kruške su zelene'],
            chips: ['Kruške', 'su', 'zelene', 'crvene', 'žute'],
            image: 'pears-green',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje su breskve?',
            questionHint: 'Какого цвета персики?',
            answer: [
                'Breskve su narandžaste i crvene',
                'Breskve su crvene i narandžaste',
                'Breskve su narandžaste',
                'Breskve su crvene',
            ],
            chips: ['Breskve', 'su', 'narandžaste', 'i', 'crvene', 'žute'],
            image: 'peaches',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje su banane?',
            questionHint: 'Какого цвета бананы?',
            answer: ['Banane su žute'],
            chips: ['Banane', 'su', 'žute', 'crvene', 'zelene'],
            image: 'bananas',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje je borovnica?',
            questionHint: 'Какого цвета голубика?',
            answer: ['Borovnica je plava'],
            chips: ['Borovnica', 'je', 'plava', 'crvena', 'žuta'],
            image: 'blueberry',
        },
    },
    {
        type: ChallengeType.QUESTION_CHIPS,
        data: {
            question: 'Koje boje je kupina?',
            questionHint: 'Какого цвета ежевика?',
            answer: ['Kupina je crna'],
            chips: ['Kupina', 'je', 'crna', 'crvena', 'žuta'],
            image: 'blackberry',
        },
    },
];
