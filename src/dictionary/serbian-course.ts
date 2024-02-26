interface Translation {
    en: string;
    ru: string;
}

export type DictionaryKeys =
    | 'paradajz'
    | 'krastavac'
    | 'krompir'
    | 'paprika'
    | 'jabuka'
    | 'kruška'
    | 'kajsija'
    | 'breskva'
    | 'limun'
    | 'banana'
    | 'borovnica'
    | 'kupina'
    | 'jagoda'
    | 'malina'
    | 'kupus'
    | 'tikvica'
    | 'bundeva'
    | 'šargarepa'
    | 'viljuška'
    | 'kašika'
    | 'nož'
    | 'kašičica'
    | 'tanjir'
    | 'čaša'
    | 'šolja'
    | 'flaša';

export const dictionary: Record<DictionaryKeys, Translation> = {
    paradajz: {
        en: 'tomato',
        ru: 'помидор',
    },
    krastavac: {
        en: 'cucumber',
        ru: 'огурец',
    },
    krompir: {
        en: 'potato',
        ru: 'картофель',
    },
    paprika: {
        en: 'sweet pepper',
        ru: 'сладкий перец',
    },
    jabuka: {
        en: 'apple',
        ru: 'яблоко',
    },
    kruška: {
        en: 'pear',
        ru: 'груша',
    },
    kajsija: {
        en: 'apricot',
        ru: 'абрикос',
    },
    breskva: {
        en: 'peach',
        ru: 'персик',
    },
    limun: {
        en: 'lemon',
        ru: 'лимон',
    },
    banana: {
        en: 'banana',
        ru: 'банан',
    },
    borovnica: {
        en: 'blueberry',
        ru: 'черника',
    },
    kupina: {
        en: 'blackberry',
        ru: 'ежевика',
    },
    jagoda: {
        en: 'strawberry',
        ru: 'клубника',
    },
    malina: {
        en: 'raspberry',
        ru: 'малина',
    },
    kupus: {
        en: 'cabbage',
        ru: 'капуста',
    },
    tikvica: {
        en: 'courgette',
        ru: 'кабачок',
    },
    bundeva: {
        en: 'pumpkin',
        ru: 'тыква',
    },
    šargarepa: {
        en: 'carrot',
        ru: 'морковь',
    },
    viljuška: {
        en: 'fork',
        ru: 'вилка',
    },
    kašika: {
        en: 'spoon',
        ru: 'ложка',
    },
    nož: {
        en: 'knife',
        ru: 'нож',
    },
    kašičica: {
        en: 'teaspoon',
        ru: 'чайная ложка',
    },
    tanjir: {
        en: 'plate',
        ru: 'тарелка',
    },
    čaša: {
        en: 'glass',
        ru: 'стакан',
    },
    šolja: {
        en: 'cup',
        ru: 'чашка',
    },
    flaša: {
        en: 'bottle',
        ru: 'бутылка',
    },
};

export const englishSerbianDictionary: Record<string, string> = Object.entries(
    dictionary,
).reduce(
    (dict: Record<string, string>, [key, value]: [string, Translation]) => {
        dict[value.en] = key;

        return dict;
    },
    {},
);

export const russianSerbianDictionary: Record<string, string> = Object.entries(
    dictionary,
).reduce(
    (dict: Record<string, string>, [key, value]: [string, Translation]) => {
        dict[value.ru] = key;

        return dict;
    },
    {},
);
