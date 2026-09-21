import type { WordTopicDescription } from '@words/types';

export const topic: WordTopicDescription = {
    name: 'berries',
    displayName: 'Ягоды',
    description: 'Всё, что продают на рынке стаканчиками',
    image: 'strawberry',
    words: [
        {
            id: 'jagoda',
            gender: 'f',
            example: 'Jagoda miriše na leto.',
            exampleTranslation: 'Клубника пахнет летом.',
            tip: 'Ложный друг: jagoda — именно клубника, а ягода вообще — bobica.',
        },
        {
            id: 'malina',
            gender: 'f',
            example: 'Malina je moja omiljena.',
            exampleTranslation: 'Малина — моя любимая.',
        },
        {
            id: 'borovnica',
            gender: 'f',
            example: 'Borovnica je sitna i plava.',
            exampleTranslation: 'Черника мелкая и синяя.',
        },
        {
            id: 'kupina',
            gender: 'f',
            example: 'Kupina raste u šumi.',
            exampleTranslation: 'Ежевика растёт в лесу.',
            tip: 'Не путайте с kupus — это капуста.',
        },
        {
            id: 'trešnja',
            gender: 'f',
            example: 'Trešnja je slatka, a višnja kisela.',
            exampleTranslation: 'Черешня сладкая, а вишня кислая.',
            tip: 'Trešnja — черешня, višnja — вишня. Пара, которую стоит запомнить вместе.',
        },
        {
            id: 'višnja',
            gender: 'f',
            example: 'Od višnje pravimo sok.',
            exampleTranslation: 'Из вишни мы делаем сок.',
        },
    ],
};
