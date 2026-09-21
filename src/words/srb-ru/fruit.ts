import type { WordTopicDescription } from '@words/types';

export const topic: WordTopicDescription = {
    name: 'fruit',
    displayName: 'Фрукты',
    description: 'Самое частое на сербском столе',
    image: 'apple',
    words: [
        {
            id: 'jabuka',
            gender: 'f',
            example: 'Jedem jabuku svaki dan.',
            exampleTranslation: 'Я ем яблоко каждый день.',
            tip: 'В винительном падеже jabuka становится jabuku.',
        },
        {
            id: 'kruška',
            gender: 'f',
            example: 'Ova kruška je veoma slatka.',
            exampleTranslation: 'Эта груша очень сладкая.',
        },
        {
            id: 'kajsija',
            gender: 'f',
            example: 'Kajsija zri u junu.',
            exampleTranslation: 'Абрикос созревает в июне.',
        },
        {
            id: 'breskva',
            gender: 'f',
            example: 'Breskva ima mekanu koru.',
            exampleTranslation: 'У персика мягкая кожица.',
        },
        {
            id: 'limun',
            gender: 'm',
            example: 'Limun je kiseo.',
            exampleTranslation: 'Лимон кислый.',
            tip: 'Отсюда limunada — лимонад.',
        },
        {
            id: 'banana',
            gender: 'f',
            example: 'Banana je žuta.',
            exampleTranslation: 'Банан жёлтый.',
            tip: 'В сербском banana женского рода, а в русском банан — мужского.',
        },
    ],
};
