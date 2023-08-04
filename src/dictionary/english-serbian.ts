export const dictionary: Record<string, string> = {
    // lesson-1
    tomato: 'paradajz',
    cucumber: 'kratavac',
    potato: 'krompir',
    pepper: 'paprika',
    // lesson-2
    apple: 'jabuka',
    pear: 'kruška',
    apricot: 'kajsija',
    peach: 'breskva',
    // lesson-3
    blueberry: 'borovnica',
    blackberry: 'kupina',
    strawberry: 'jagoda',
    raspberry: 'malina'
};

export const reverseDictionary: Record<string, string> = Object.entries(dictionary)
    .reduce((dict: Record<string, string>, [key, value]: [string, string]) => {
        dict[value] = key;

        return dict;
    }, {});
    