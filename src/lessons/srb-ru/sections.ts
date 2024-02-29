export interface SectionDescription {
    name: string;
    displayName: string;
    lessonIds: string[];
}

export const sections: SectionDescription[] = [
    {
        name: 'introduction',
        displayName: 'Введение',
        lessonIds: [
            'conversation/greetings-1',
            'conversation/languages',
            'verb/jesam',
            'verb/nisam',
        ],
    },
    {
        name: 'food',
        displayName: 'Еда',
        lessonIds: [
            'food/vegetables-1',
            'food/fruit-1',
            'food/berries-1',
            'food/vegetables-2',
            'food/colors',
            'food/kitchenware',
        ],
    },
];
