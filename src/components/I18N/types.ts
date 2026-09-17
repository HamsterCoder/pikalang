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
