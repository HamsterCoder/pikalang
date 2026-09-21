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
            tip: 'В сербском это слово мужского рода: crven paradajz.',
        },
        {
            id: 'krastavac',
            gender: 'm',
            example: 'Krastavac ide u salatu.',
            exampleTranslation: 'Огурец идёт в салат.',
        },
        {
            id: 'krompir',
            gender: 'm',
            example: 'Volim pečeni krompir.',
            exampleTranslation: 'Я люблю печёный картофель.',
        },
        {
            id: 'paprika',
            gender: 'f',
            example: 'Paprika može biti ljuta.',
            exampleTranslation: 'Перец может быть острым.',
            tip: 'Slatka paprika — сладкий, ljuta paprika — острый.',
        },
        {
            id: 'kupus',
            gender: 'm',
            example: 'Kupus kupujem na pijaci.',
            exampleTranslation: 'Капусту я покупаю на рынке.',
            tip: 'Не путайте с kupina — это ежевика.',
        },
        {
            id: 'tikvica',
            gender: 'f',
            example: 'Tikvica je zelena i mekana.',
            exampleTranslation: 'Кабачок зелёный и мягкий.',
            tip: 'Уменьшительное от tikva (тыква): -ica делает слово меньше.',
        },
        {
            id: 'bundeva',
            gender: 'f',
            example: 'Bundeva je velika i narandžasta.',
            exampleTranslation: 'Тыква большая и оранжевая.',
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
