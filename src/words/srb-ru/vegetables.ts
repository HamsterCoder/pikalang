import type { WordTopicDescription } from '@words/types';

export const topic: WordTopicDescription = {
    name: 'vegetables',
    displayName: 'Овощи',
    description: 'То, что лежит на прилавке зеленщика',
    image: 'sweet-pepper',
    words: [
        {
            id: 'paradajz',
            gender: 'm',
            example: 'Paradajz je crven i sočan.',
            exampleTranslation: 'Помидор красный и сочный.',
            tip: 'Ударение на первый слог: PA-ra-dajz.',
        },
        {
            id: 'krastavac',
            gender: 'm',
            example: 'Krastavac ide u salatu.',
            exampleTranslation: 'Огурец идёт в салат.',
            tip: 'Ударение на первый слог: KRA-sta-vac.',
        },
        {
            id: 'krompir',
            gender: 'm',
            example: 'Volim pečeni krompir.',
            exampleTranslation: 'Я люблю печёный картофель.',
            tip: 'Ударение на первый слог: KROM-pir. В сербском оно никогда не падает на последний слог.',
        },
        {
            id: 'paprika',
            gender: 'f',
            example: 'Paprika može biti ljuta.',
            exampleTranslation: 'Перец может быть острым.',
            tip: 'Ударение на первый слог: PA-pri-ka.',
        },
        {
            id: 'kupus',
            gender: 'm',
            example: 'Kupus kupujem na pijaci.',
            exampleTranslation: 'Капусту я покупаю на рынке.',
            tip: 'Ударение на первый слог: KU-pus.',
        },
        {
            id: 'tikvica',
            gender: 'f',
            example: 'Tikvica je zelena i mekana.',
            exampleTranslation: 'Кабачок зелёный и мягкий.',
            tip: 'Ударение на первый слог: TIK-vi-ca.',
        },
        {
            id: 'bundeva',
            gender: 'f',
            example: 'Bundeva je velika i narandžasta.',
            exampleTranslation: 'Тыква большая и оранжевая.',
            tip: 'Ударение на первый слог: BUN-de-va.',
        },
        {
            id: 'šargarepa',
            gender: 'f',
            example: 'Šargarepa je slatka.',
            exampleTranslation: 'Морковь сладкая.',
            tip: 'Ударение на первый слог: ŠAR-ga-re-pa.',
        },
    ],
};
