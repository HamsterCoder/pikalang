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
        en: 'Start lesson',
        ru: 'Перейти к уроку',
    },
    'lesson-list-practice-button': {
        en: 'Practice',
        ru: 'Начать',
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
    'lesson-skip-button': {
        en: 'Skip',
        ru: 'Пропустить',
    },
    'lesson-word-bank': {
        en: 'Available words',
        ru: 'Доступные слова',
    },
    'lesson-reset-answer': {
        en: 'Reset',
        ru: 'Сбросить',
    },
    'lesson-tap-words-hint': {
        en: 'Tap the words below to translate',
        ru: 'Нажимайте на слова ниже, чтобы перевести',
    },
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

    'word-list-intro': {
        en: 'Pick a topic and meet its words a few at a time.',
        ru: 'Выберите тему и знакомьтесь с её словами по несколько за раз.',
    },
    'word-topic-words': ({ learned, total }) => ({
        en: `${learned} of ${total} words`,
        ru: `${learned} из ${total} ${pluralRu(
            Number(total),
            'слова',
            'слов',
            'слов',
        )}`,
    }),
    'word-topic-sets': ({ completed, total }) => ({
        en: `${completed}/${total} sets`,
        ru: `${completed}/${total} ${pluralRu(
            Number(total),
            'подход',
            'подхода',
            'подходов',
        )}`,
    }),
    'word-topic-sets-label': {
        en: 'Sets completed',
        ru: 'Пройдено подходов',
    },
    'word-topic-action-start': {
        en: 'Start',
        ru: 'Начать',
    },
    'word-topic-action-continue': {
        en: 'Continue',
        ru: 'Продолжить',
    },
    'word-topic-action-review': {
        en: 'Review',
        ru: 'Повторить',
    },

    'word-new-prompt': ({ index, total }) => ({
        en: `New word ${index} of ${total}`,
        ru: `Новое слово ${index} из ${total}`,
    }),
    'word-match-prompt': {
        en: 'Match the words to their translations',
        ru: 'Соедините слова с переводом',
    },
    'word-match-column-serbian': {
        en: 'Serbian',
        ru: 'Сербский',
    },
    'word-match-column-russian': {
        en: 'Russian',
        ru: 'Русский',
    },
    'word-match-remaining': ({ count }) => ({
        en: `${count} pairs left`,
        ru: `Осталось ${count} ${pluralRu(
            Number(count),
            'пара',
            'пары',
            'пар',
        )}`,
    }),
    'word-gender-masculine': {
        en: 'Noun, masculine',
        ru: 'Существительное, мужской род',
    },
    'word-gender-feminine': {
        en: 'Noun, feminine',
        ru: 'Существительное, женский род',
    },
    'word-gender-neuter': {
        en: 'Noun, neuter',
        ru: 'Существительное, средний род',
    },
    'word-gender-short-m': {
        en: 'masculine',
        ru: 'мужской род',
    },
    'word-gender-short-f': {
        en: 'feminine',
        ru: 'женский род',
    },
    'word-gender-short-n': {
        en: 'neuter',
        ru: 'средний род',
    },
    'word-match-hint': {
        en: 'Tap a Serbian word first, then its translation.',
        ru: 'Нажмите сербское слово, затем его перевод.',
    },
    'word-tip-label': {
        en: 'Tip',
        ru: 'Подсказка',
    },
    'word-known-button': {
        en: 'I already know this',
        ru: 'Уже знаю',
    },
    'word-continue-button': {
        en: 'Continue',
        ru: 'Продолжить',
    },
    'word-exit-button': {
        en: 'Finish the set',
        ru: 'Завершить подход',
    },
    'word-progress-label': {
        en: 'Set progress',
        ru: 'Прогресс подхода',
    },
    'word-time-label': {
        en: 'Time',
        ru: 'Время',
    },
    'word-complete-appraisal': {
        en: 'Well done!',
        ru: 'Отличная работа!',
    },
    'word-complete-xp': ({ xp }) => ({
        en: `${xp} stars added to your experience.`,
        ru: `${xp} ${pluralRu(
            Number(xp),
            'звездочка добавлена',
            'звездочки добавлены',
            'звездочек добавлено',
        )} к вашему опыту.`,
    }),
    'word-complete-to-topics': {
        en: 'See other topics',
        ru: 'Посмотреть другие темы',
    },
    'word-result-learned': {
        en: 'New words learned',
        ru: 'Новых слов выучено',
    },
    'word-result-matched': {
        en: 'Pairs matched first time',
        ru: 'Пар угадано с первого раза',
    },
    'word-result-time': {
        en: 'Matching time',
        ru: 'Время на пары',
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
