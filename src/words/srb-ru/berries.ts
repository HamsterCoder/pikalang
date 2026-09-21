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
            tip: 'Ударение на первый слог: JA-go-da.',
        },
        {
            id: 'malina',
            gender: 'f',
            example: 'Malina je moja omiljena.',
            exampleTranslation: 'Малина — моя любимая.',
            tip: 'Ударение на первый слог: MA-li-na, а не как в русском «малина».',
        },
        {
            id: 'borovnica',
            gender: 'f',
            example: 'Borovnica je plava i slatka.',
            exampleTranslation: 'Голубика синяя и сладкая.',
            tip: 'Ударение на первый слог: BO-rov-ni-ca.',
        },
        {
            id: 'kupina',
            gender: 'f',
            example: 'Kupina raste u šumi.',
            exampleTranslation: 'Ежевика растёт в лесу.',
            tip: 'Ударение на первый слог: KU-pi-na.',
        },
        {
            id: 'trešnja',
            gender: 'f',
            example: 'Trešnja je slatka, a višnja kisela.',
            exampleTranslation: 'Черешня сладкая, а вишня кислая.',
            tip: 'Ударение на первый слог: TRE-šnja.',
        },
        {
            id: 'višnja',
            gender: 'f',
            example: 'Od višnje pravimo sok.',
            exampleTranslation: 'Из вишни мы делаем сок.',
            tip: 'Ударение на первый слог: VI-šnja.',
        },
    ],
};
