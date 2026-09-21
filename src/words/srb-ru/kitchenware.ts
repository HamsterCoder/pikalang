import type { WordTopicDescription } from '@words/types';

export const topic: WordTopicDescription = {
    name: 'kitchenware',
    displayName: 'Посуда',
    description: 'Что оказывается на столе перед едой',
    image: 'cup',
    words: [
        {
            id: 'tanjir',
            gender: 'm',
            example: 'Tanjir je prazan.',
            exampleTranslation: 'Тарелка пустая.',
            tip: 'Ударение на первый слог: TA-njir.',
        },
        {
            id: 'kašika',
            gender: 'f',
            example: 'Supu jedem kašikom.',
            exampleTranslation: 'Суп я ем ложкой.',
            tip: 'Ударение на первый слог: KA-ši-ka.',
        },
        {
            id: 'viljuška',
            gender: 'f',
            example: 'Viljuška stoji levo od tanjira.',
            exampleTranslation: 'Вилка лежит слева от тарелки.',
            tip: 'Ударение на первый слог: VI-lju-ška.',
        },
        {
            id: 'nož',
            gender: 'm',
            example: 'Nož je oštar.',
            exampleTranslation: 'Нож острый.',
            tip: 'Один слог, ударение падать больше некуда. Во множественном числе оно остаётся в начале: NO-že-vi.',
        },
        {
            id: 'kašičica',
            gender: 'f',
            example: 'Kašičica je mala kašika.',
            exampleTranslation: 'Чайная ложка — это маленькая ложка.',
            tip: 'Ударение на первый слог: KA-ši-či-ca.',
        },
        {
            id: 'čaša',
            gender: 'f',
            example: 'U čaši je voda.',
            exampleTranslation: 'В стакане вода.',
            tip: 'Ударение на первый слог: ČA-ša.',
        },
        {
            id: 'šolja',
            gender: 'f',
            example: 'Pijem kafu iz šolje.',
            exampleTranslation: 'Я пью кофе из чашки.',
            tip: 'Ударение на первый слог: ŠO-lja.',
        },
        {
            id: 'flaša',
            gender: 'f',
            example: 'Flaša vode košta sto dinara.',
            exampleTranslation: 'Бутылка воды стоит сто динаров.',
            tip: 'Ударение на первый слог: FLA-ša.',
        },
    ],
};
