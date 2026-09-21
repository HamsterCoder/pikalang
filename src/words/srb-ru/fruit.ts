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
            tip: 'Ударение на первый слог: JA-bu-ka.',
        },
        {
            id: 'kruška',
            gender: 'f',
            example: 'Ova kruška je veoma slatka.',
            exampleTranslation: 'Эта груша очень сладкая.',
            tip: 'Ударение на первый слог: KRU-ška.',
        },
        {
            id: 'kajsija',
            gender: 'f',
            example: 'Kajsija zri u junu.',
            exampleTranslation: 'Абрикос созревает в июне.',
            tip: 'Ударение на первый слог: KAJ-si-ja.',
        },
        {
            id: 'breskva',
            gender: 'f',
            example: 'Breskva ima mekanu koru.',
            exampleTranslation: 'У персика мягкая кожица.',
            tip: 'Ударение на первый слог: BRE-skva.',
        },
        {
            id: 'limun',
            gender: 'm',
            example: 'Limun je kiseo.',
            exampleTranslation: 'Лимон кислый.',
            tip: 'Ударение на первый слог: LI-mun, а не как в русском «лимон».',
        },
        {
            id: 'banana',
            gender: 'f',
            example: 'Banana je žuta.',
            exampleTranslation: 'Банан жёлтый.',
            tip: 'Ударение на второй слог: ba-NA-na. Одно из немногих слов не с первого слога.',
        },
    ],
};
