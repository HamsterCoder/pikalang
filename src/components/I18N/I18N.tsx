import { FunctionComponent } from "react";

export enum I18NLangs {
    EN = 'en',
    RU = 'ru'
}

export interface I18NProps {
    textKey: string;
    lang: I18NLangs;
};

export interface I18NTranslation {
    [I18NLangs.EN]: string,
    [I18NLangs.RU]: string,
}

const dictionary: Record<string, I18NTranslation> = {
    'question-chips-prompt': {
        en: 'Answer the question',
        ru: 'Ответьте на вопрос'
    },
    'translate-chips-prompt': {
        en: 'Translate this sentence',
        ru: 'Переведите предложение'
    },
    'word-picture-prompt': {
        en: 'Choose the correct image',
        ru: 'Выберите нужную картинку'
    },
}; 

function translate(key: string, lang: I18NLangs): string {
    return dictionary[key]?.[lang] || '';
}

export const I18N: FunctionComponent<I18NProps> = ({ textKey, lang }) => {    
    return <>{translate(textKey, lang)}</>;
};