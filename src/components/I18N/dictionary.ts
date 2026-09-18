import { I18NLangs, I18NTranslation } from '@components/I18N/types';

type I18NEntry =
    | I18NTranslation
    | ((values: Record<string, number | string>) => I18NTranslation);

/**
 * Picks the Russian plural form for a count: 1 урок, 2 урока, 5 уроков.
 */
function pluralRu(
    count: number,
    one: string,
    few: string,
    many: string,
): string {
    const mod100 = count % 100;
    const mod10 = count % 10;

    if (mod100 >= 11 && mod100 <= 14) {
        return many;
    }

    if (mod10 === 1) {
        return one;
    }

    return mod10 >= 2 && mod10 <= 4 ? few : many;
}

// TODO
// Allow using external dictionaries
const dictionary: Record<string, I18NEntry> = {
    'question-chips-prompt': {
        en: 'Provide the correct response',
        ru: 'Выберите правильный ответ',
    },
    'translate-chips-prompt': {
        en: 'Translate this sentence',
        ru: 'Переведите предложение',
    },
    'word-picture-prompt': {
        en: 'Choose the correct image',
        ru: 'Выберите нужную картинку',
    },
    'insert-chips-prompt': {
        en: 'Insert the missing words',
        ru: 'Вставьте пропущенные слова',
    },
    'lesson-help-title': {
        ru: 'Перед прохождением урока',
        en: 'Before starting the lesson',
    },
    'lesson-start-button': {
        en: 'Перейти к уроку',
        ru: 'Start lesson',
    },
    'lesson-list-practice-button': {
        en: 'Practice',
        ru: 'Начать',
    },
    'lesson-list-heading': {
        en: 'Lessons',
        ru: 'Уроки',
    },
    'lesson-list-locked-message': {
        en: 'Complete the previous lesson to unlock this one. Fill the progress bar.',
        ru: 'Сначала нужно полностью пройти предыдущий урок. Заполните весь прогресс-бар.',
    },
    'lesson-submit-button': {
        en: 'Check',
        ru: 'Проверить',
    },
    'lesson-next-button': {
        en: 'Continue',
        ru: 'Продолжить',
    },
    'lesson-submit-correct-message': {
        en: 'The answer is correct',
        ru: 'Все верно.',
    },
    'lesson-submit-translation-message': {
        en: 'Translation: ',
        ru: 'Перевод: ',
    },
    'lesson-submit-another-message': {
        en: 'Another correct response: ',
        ru: 'Другой вариант ответа: ',
    },
    'lesson-submit-error-message': {
        en: 'Incorrect.',
        ru: 'Неверно.',
    },
    'lesson-submit-expected-message': {
        en: 'Expected answer: ',
        ru: 'Ожидаемый ответ: ',
    },
    'lesson-progress-label': {
        en: 'Lesson progress',
        ru: 'Прогресс урока',
    },
    'lesson-exit-button': {
        en: 'Finish the lesson',
        ru: 'Завершить урок',
    },
    'lesson-complete-appraisal': {
        en: 'Well done!',
        ru: 'Отличная работа!',
    },
    'lesson-complete-stats': ({ correct, total, xp }) => ({
        en: `You have ${correct} out of ${total} challenges correct and you have earned ${xp} stars.`,
        ru: `Вы сделали ${correct} из ${total} упражнений верно и заработали ${xp} звездочек.`,
    }),
    'lesson-complete-to-lesson-list': {
        en: 'See other lessons',
        ru: 'Посмотреть другие уроки',
    },

    'course-name': {
        en: 'Serbian',
        ru: 'Сербский',
    },
    'course-subtitle': {
        en: 'Serbian course',
        ru: 'Курс сербского',
    },
    'app-navigation-label': {
        en: 'Main navigation',
        ru: 'Основная навигация',
    },
    'course-label': {
        en: 'Current course',
        ru: 'Текущий курс',
    },
    'xp-label': {
        en: 'Experience',
        ru: 'Опыт',
    },
    'word-list-heading': {
        en: 'Words',
        ru: 'Слова',
    },
    'lesson-path-heading': {
        en: 'Lessons',
        ru: 'Уроки',
    },
    /** Labels the doorway to the redesign from the old header. */
    'lesson-path-preview-heading': {
        en: 'New design',
        ru: 'Новый дизайн',
    },
    'lesson-path-unit-label': ({ index }) => ({
        en: `Unit ${index}`,
        ru: `Раздел ${index}`,
    }),
    'lesson-path-unit-progress': ({ completed, total }) => ({
        en: `${completed} of ${total} lessons complete`,
        // After "из" the noun is genitive: "из 1 урока", "из 6 уроков".
        ru: `${completed} из ${total} ${pluralRu(
            Number(total),
            'урока',
            'уроков',
            'уроков',
        )} пройдено`,
    }),
    'lesson-path-unit-complete': {
        en: 'Unit complete',
        ru: 'Раздел пройден',
    },
    'lesson-path-lesson-label': ({ unit, index }) => ({
        en: `Lesson ${unit}.${index}`,
        ru: `Урок ${unit}.${index}`,
    }),
    'lesson-path-state-completed': {
        en: 'Mastered',
        ru: 'Пройден',
    },
    'lesson-path-state-active': {
        en: 'In progress',
        ru: 'В процессе',
    },
    'lesson-path-state-locked': {
        en: 'Locked',
        ru: 'Закрыт',
    },
    'lesson-path-action-review': {
        en: 'Review',
        ru: 'Повторить',
    },
    'lesson-path-action-continue': {
        en: 'Continue',
        ru: 'Продолжить',
    },
    'lesson-path-action-start': {
        en: 'Start',
        ru: 'Начать',
    },
    'lesson-path-steps': ({ completed, total }) => ({
        en: `${completed}/${total} runs`,
        ru: `${completed}/${total} подходов`,
    }),
    'lesson-path-steps-locked': ({ total }) => ({
        en: `${total} runs`,
        ru: `${total} ${pluralRu(
            Number(total),
            'подход',
            'подхода',
            'подходов',
        )}`,
    }),
    'lesson-path-steps-label': {
        en: 'Lesson attempts',
        ru: 'Подходы к уроку',
    },
    'lesson-path-next-unit': {
        en: 'Next milestone',
        ru: 'Следующая цель',
    },
    'lesson-path-next-unit-hint': {
        en: 'Finish every lesson in this unit to unlock it.',
        ru: 'Пройдите все уроки этого раздела, чтобы открыть его.',
    },
    'lesson-path-next-unit-lessons': ({ count }) => ({
        en: `${count} lessons ahead`,
        ru: `Впереди ${count} ${pluralRu(
            Number(count),
            'урок',
            'урока',
            'уроков',
        )}`,
    }),
    'lesson-path-finish': {
        en: 'That is every lesson for now',
        ru: 'Это все уроки на сегодня',
    },
    'lesson-path-finish-hint': {
        en: 'New units are on the way. Review what you have learned in the meantime.',
        ru: 'Новые разделы уже в пути. А пока можно повторить пройденное.',
    },

    'conversation-list-heading': {
        en: 'Conversations',
        ru: 'Разговоры',
    },
    'conversation-prompt': {
        en: 'Read the dialog. Hover the phrases to see translations.',
        ru: 'Прочтите диалог. Наведите на фразу, чтобы увидеть перевод.',
    },
};

/**
 * Resolves a dictionary key to a plain string, for places that need text
 * rather than nodes (aria labels, titles, alt text).
 */
export function translate(
    lang: I18NLangs,
    key: string,
    values?: Record<string, number | string>,
): string {
    const translationMethod = dictionary[key];

    if (
        typeof translationMethod === 'function' &&
        typeof values !== 'undefined'
    ) {
        return translationMethod(values)[lang];
    }

    if (
        typeof translationMethod !== 'function' &&
        typeof translationMethod !== 'undefined'
    ) {
        return translationMethod[lang];
    }

    return key;
}
