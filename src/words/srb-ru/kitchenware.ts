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
        },
        {
            id: 'kašika',
            gender: 'f',
            example: 'Supu jedem kašikom.',
            exampleTranslation: 'Суп я ем ложкой.',
        },
        {
            id: 'viljuška',
            gender: 'f',
            example: 'Viljuška stoji levo od tanjira.',
            exampleTranslation: 'Вилка лежит слева от тарелки.',
        },
        {
            id: 'nož',
            gender: 'm',
            example: 'Nož je oštar.',
            exampleTranslation: 'Нож острый.',
            tip: 'Множественное число — noževi.',
        },
        {
            id: 'kašičica',
            gender: 'f',
            example: 'Kašičica je mala kašika.',
            exampleTranslation: 'Чайная ложка — это маленькая ложка.',
            tip: 'Суффикс -ica снова делает слово меньше: kašika → kašičica.',
        },
        {
            id: 'čaša',
            gender: 'f',
            example: 'U čaši je voda.',
            exampleTranslation: 'В стакане вода.',
            tip: 'Čaša — стакан без ручки, šolja — чашка с ручкой.',
        },
        {
            id: 'šolja',
            gender: 'f',
            example: 'Pijem kafu iz šolje.',
            exampleTranslation: 'Я пью кофе из чашки.',
        },
        {
            id: 'flaša',
            gender: 'f',
            example: 'Flaša vode košta sto dinara.',
            exampleTranslation: 'Бутылка воды стоит сто динаров.',
        },
    ],
};
