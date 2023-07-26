export const dictionary: Record<string, string> = {
    tomato: 'paradajz',
};

export const reverseDictionary: Record<string, string> = Object.entries(dictionary)
    .reduce((dict: Record<string, string>, [key, value]: [string, string]) => {
        dict[value] = key;

        return dict;
    }, {});