import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import { LessonDescription } from '@components/Lesson/Lesson';

// Lesson: Kuhinski pribor
// 1. Viljuška WordPicture challenge
// 2. Kašika WordPicture challenge
// 3. Nož WordPicture challenge
// 4. KašiĆica WordPicture challenge
// 5. Tanjir WordPicture challenge
// 6. Čaša WordPicture challenge
// 7. Šolja WordPicture challenge
// 8. Flaša WordPicture challenge
// 9. TranslateChips challenge Kafa je u šolji.
// 10. TranslateChips challenge Vino je u flaši.
// 11. TranslateChips challenge Voda je u čaši.
// 12. TranslateChips challenge Supa je u tanjiru.
// 13. TranslateChips challenge Da li mogu da dobijem nož.
// 14. TranslateChips challenge Da li mogu da dobijem kašiku?
// 15. TranslateChips challenge Da li mogu da dobijem viljušku?
// 16. TranslateChips challenge Da li mogu da dobijem kašičicu?

export const description: LessonDescription = {
    id: 'food/kitchenware',
    name: 'food/kitchenware',
    displayName: 'Посуда и приборы',
    topic: 'food',
    displayTopic: 'Еда',
    image: 'kitchenware',
    description: 'Учим названия предметов посуды и кухонных приборов',
};

export const challenges: ChallengeDescription[] = [
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'viljuška',
            images: ['fork', 'spoon', 'knife'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'kašika',
            images: ['spoon', 'fork', 'knife'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'nož',
            images: ['knife', 'teaspoon', 'spoon'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'kašičica',
            images: ['teaspoon', 'fork', 'spoon'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'tanjir',
            images: ['plate', 'glass', 'bottle'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'čaša',
            images: ['glass', 'cup', 'bottle'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'šolja',
            images: ['cup', 'glass', 'bottle'],
        },
    },
    {
        type: ChallengeType.WORD_PICTURE,
        data: {
            word: 'flaša',
            images: ['bottle', 'cup', 'glass'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Kafa je u šolji.',
            answer: ['Кофе в чашке.'],
            wrongChips: ['тарелке.', 'бутылке.', 'стакане.'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Vino je u flaši.',
            answer: ['Вино в бутылке.'],
            wrongChips: ['стакане.', 'чашке.', 'тарелке.'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Voda je u čaši.',
            answer: ['Вода в стакане.'],
            wrongChips: ['бутылке.', 'тарелке.', 'чашке.'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Supa je u tanjiru.',
            answer: ['Суп в тарелке.'],
            wrongChips: ['бутылке.', 'чашке.', 'стакане.'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li mogu da dobijem nož.',
            answer: ['Можно мне нож?', 'Можно нож?'],
            wrongChips: ['вилку?', 'ложку?', 'чашку?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li mogu da dobijem kašiku?',
            answer: ['Можно мне ложку?', 'Можно ложку?'],
            wrongChips: ['вилку?', 'нож?', 'чашку?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li mogu da dobijem viljušku?',
            answer: ['Можно мне вилку?', 'Можно вилку?'],
            wrongChips: ['ложку?', 'тарелку?', 'стакан?'],
        },
    },
    {
        type: ChallengeType.TRANSLATE_CHIPS,
        data: {
            sentence: 'Da li mogu da dobijem kašičicu?',
            answer: ['Можно мне чайную ложку?', 'Можно чайную ложку?'],
            wrongChips: ['ложку?', 'нож?', 'тарелку?'],
        },
    },
];
