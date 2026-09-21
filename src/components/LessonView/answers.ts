/**
 * Checking what the learner entered, and building the words they choose
 * from. Kept apart from the views so the rules live in one place.
 */
import { shuffle } from '@utils/shuffle';

import type { TranslateChipsData } from '@lessons/types';

export function isCorrectAnswer(
    possibleAnswers: string[],
    answerChips: string[],
) {
    return possibleAnswers.some(
        (possibleAnswer) =>
            possibleAnswer.toLowerCase() ===
            answerChips.join(' ').toLowerCase(),
    );
}

export function prepareAnotherAnswer(
    possibleAnswers: string[],
    answerChips: string[],
): string | undefined {
    const answerIndex = possibleAnswers.findIndex(
        (possibleAnswer) =>
            possibleAnswer.toLowerCase() ===
            answerChips.join(' ').toLowerCase(),
    );

    if (answerIndex !== -1) {
        if (possibleAnswers.length === 1) {
            return;
        }

        if (answerIndex !== possibleAnswers.length - 1) {
            return possibleAnswers[answerIndex + 1];
        } else {
            return possibleAnswers[0];
        }
    }

    return;
}

/**
 * Parsing for `INSERT_CHIPS` sentences, where a blank is written in braces:
 * `'Ja {razumem} srpski.'`. Shared by the challenge components and the answer
 * check so the two can never disagree on where the blanks are.
 */
export interface ParsedSentence {
    /** The words hidden in braces, in the order they appear. */
    missingWords: string[];
    /** The plain text between the blanks. One more than `missingWords`. */
    fragments: string[];
}

export function parseSentence(sentence: string): ParsedSentence {
    const missingWords = [];
    const fragments = [];

    let readingWord = false;
    let currentWord = '';
    let currentFragment = '';

    for (const char of sentence) {
        if (readingWord) {
            if (char === '}') {
                missingWords.push(currentWord);
                currentWord = '';
                readingWord = false;
            } else {
                currentWord += char;
            }
        } else {
            if (char === '{') {
                fragments.push(currentFragment);
                currentFragment = '';
                readingWord = true;
            } else {
                currentFragment += char;
            }
        }
    }

    fragments.push(currentFragment);

    return { missingWords, fragments };
}

export function countMissingWords(sentence: string): number {
    return parseSentence(sentence).missingWords.length;
}

/** The sentence as it reads once every blank is filled in. */
export function computeAnswer(sentence: string): string {
    return sentence.replace(/{|}/g, '');
}

function arrayCount(array: string[]): Record<string, number> {
    const count: Record<string, number> = {};

    for (const word of array) {
        count[word] = count[word] || 0;
        count[word] += 1;
    }

    return count;
}

function arrayUnion(first: string[], second: string[]): string[] {
    const firstCount = arrayCount(first);
    const secondCount = arrayCount(second);

    const count: Record<string, number> = {};

    for (const word of Object.keys(firstCount)) {
        count[word] = Math.max(firstCount[word], secondCount[word] ?? 0);
        delete firstCount[word];
        delete secondCount[word];
    }

    for (const word of Object.keys(secondCount)) {
        count[word] = secondCount[word];
    }

    let words: string[] = [];

    for (const word of Object.keys(count)) {
        const wordArray = new Array(count[word]);
        wordArray.fill(word);
        words = words.concat(wordArray);
    }

    return words;
}

/**
 * The words on offer. A challenge either lists them outright, or gives the
 * wrong ones only, in which case the right ones come from the accepted
 * answers: enough of each word to spell whichever answer needs it most.
 */
export function buildChips(data: TranslateChipsData): string[] {
    if (!('wrongChips' in data)) {
        return data.chips;
    }

    let chips: string[] = [];

    data.answer.forEach((possibleAnswer) => {
        chips = arrayUnion(chips, possibleAnswer.split(' '));
    });

    return shuffle([...chips, ...data.wrongChips]);
}
