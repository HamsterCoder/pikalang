import { FunctionComponent } from 'react';

export enum I18NLangs {
    EN = 'en',
    RU = 'ru',
}

export interface I18NProps {
    textKey: string;
    lang: I18NLangs;
    values?: Record<string, number | string>;
}

export interface I18NTranslation {
    [I18NLangs.EN]: string;
    [I18NLangs.RU]: string;
}

const dictionary: Record<
    string,
    | I18NTranslation
    | ((values: Record<string, number | string>) => I18NTranslation)
> = {
    'question-chips-prompt': {
        en: 'Answer the question',
        ru: 'Ответьте на вопрос',
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
    'lesson-list-practice-button': {
        en: 'Practice',
        ru: 'Начать',
    },
    'lesson-list-heading': {
        en: 'Lessons',
        ru: 'Уроки',
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
    'lesson-submit-error-message': {
        en: 'Incorrect.',
        ru: 'Неверно.',
    },
    'lesson-submit-expected-message': {
        en: 'Expected answer: ',
        ru: 'Ожидаемый ответ: ',
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
};

function translate(
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

    return '';
}

export const I18N: FunctionComponent<I18NProps> = ({
    textKey,
    lang,
    values,
}) => {
    return <>{translate(lang, textKey, values)}</>;
};
