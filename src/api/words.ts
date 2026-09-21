import { dictionary } from '@dictionary/serbian-course';
import { topics } from '@words/srb-ru/topics';
import type { WordEntry, WordTopicDescription } from '@words/types';
import { emulateLatency } from '@utils/emulateLatency';

/**
 * The word library: themed topics the learner meets a handful of words at a
 * time. Like the rest of `@api`, this imitates an async API on top of
 * `localStorage` and statically imported data.
 */

/** How many new words a single set introduces, at most. */
export const WORDS_PER_SET = 4;

/**
 * A word ready for the screen: what the topic file wrote, plus what the shared
 * dictionary already knows. The translation and the illustration live in
 * `@dictionary/serbian-course`, so a topic file never repeats them.
 */
export interface WordCardData extends WordEntry {
    /** The Serbian word, as it is displayed. */
    word: string;
    /** The Russian translation. */
    translation: string;
    /** The bare asset name for `PictureImage`, e.g. `sweet-pepper`. */
    image: string;
}

export interface WordSetListItem {
    /** Counted from one, and it is the `:setNumber` route param. */
    number: number;
    words: WordCardData[];
    /** Stars earned so far, kept at the best run. */
    stars: number;
    /** A word to learn and a pair to match are worth a star each. */
    maxStars: number;
    /** The quickest the matching round has been finished, in ms. */
    bestTimeMs: number | null;
    completed: boolean;
}

export interface WordTopicListItem extends Omit<WordTopicDescription, 'words'> {
    sets: WordSetListItem[];
    wordCount: number;
    /** Words in the sets that have been played through. */
    learnedCount: number;
    stars: number;
    maxStars: number;
    /** Share of the topic played through, 0 to 100. */
    progress: number;
}

export interface WordSet {
    topicName: string;
    topicDisplayName: string;
    /** Counted from one. */
    number: number;
    /** How many sets the topic has, for "set 2 of 3". */
    setCount: number;
    words: WordCardData[];
}

interface SavedSetProgress {
    stars: number;
    timeMs: number;
}

interface SavedTopicProgress {
    sets: Record<string, SavedSetProgress>;
}

export interface WordSetResult {
    stars: number;
    /** How long the matching round took, in ms. */
    timeMs: number;
}

function getLocalStoragePath(username: string) {
    return `${username}/words_progress`;
}

/** Fills a topic word out with the translation and image the dictionary holds. */
function toCardData(entry: WordEntry): WordCardData {
    const translation = dictionary[entry.id];

    return {
        ...entry,
        word: entry.id,
        translation: translation.ru,
        // `convert-images.js` names the assets after the English word.
        image: translation.en.replace(/ /g, '-'),
    };
}

/**
 * Splits a topic's words into sets of at most `WORDS_PER_SET`, as evenly as it
 * can: six words become two sets of three rather than a four and a lonely
 * pair, so no set is too thin to make a round of matching worth playing.
 */
function splitIntoSets(words: WordEntry[]): WordCardData[][] {
    const setCount = Math.max(1, Math.ceil(words.length / WORDS_PER_SET));
    const base = Math.floor(words.length / setCount);
    /** The first `remainder` sets take one word more than the rest. */
    const remainder = words.length % setCount;

    const sets: WordCardData[][] = [];
    let taken = 0;

    for (let index = 0; index < setCount; index += 1) {
        const size = base + (index < remainder ? 1 : 0);

        sets.push(words.slice(taken, taken + size).map(toCardData));
        taken += size;
    }

    return sets;
}

/** A word to learn and a pair to match are worth a star each. */
function maxStarsFor(words: unknown[]): number {
    return words.length * 2;
}

function readProgress(
    username: string,
): Record<string, SavedTopicProgress> | null {
    return JSON.parse(
        localStorage.getItem(getLocalStoragePath(username)) ?? 'null',
    );
}

const topicMap: Record<string, WordTopicDescription> = {};

topics.forEach((topic) => {
    topicMap[topic.name] = topic;
});

export function isWordSetValid(topicName: string, setNumber: number): boolean {
    const topic = topicMap[topicName];

    if (!topic || !Number.isInteger(setNumber)) {
        return false;
    }

    return setNumber >= 1 && setNumber <= splitIntoSets(topic.words).length;
}

export function getWordSet(
    topicName: string,
    setNumber: number,
): WordSet | undefined {
    const topic = topicMap[topicName];

    if (!topic) {
        return undefined;
    }

    const sets = splitIntoSets(topic.words);
    const words = sets[setNumber - 1];

    if (!words) {
        return undefined;
    }

    return {
        topicName: topic.name,
        topicDisplayName: topic.displayName,
        number: setNumber,
        setCount: sets.length,
        words,
    };
}

export async function listWordTopics(
    username: string,
): Promise<WordTopicListItem[]> {
    if (import.meta.env.DEV) {
        await emulateLatency();
    }

    try {
        const progressData = readProgress(username);

        return topics.map((topic) => {
            const savedSets = progressData?.[topic.name]?.sets ?? {};

            const sets: WordSetListItem[] = splitIntoSets(topic.words).map(
                (words, index) => {
                    const saved = savedSets[String(index + 1)];

                    return {
                        number: index + 1,
                        words,
                        stars: saved?.stars ?? 0,
                        maxStars: maxStarsFor(words),
                        bestTimeMs: saved?.timeMs ?? null,
                        completed: Boolean(saved),
                    };
                },
            );

            const completedSets = sets.filter((set) => set.completed);

            const learnedCount = completedSets.reduce(
                (total, set) => total + set.words.length,
                0,
            );

            return {
                name: topic.name,
                displayName: topic.displayName,
                description: topic.description,
                image: topic.image,
                sets,
                wordCount: topic.words.length,
                learnedCount,
                stars: sets.reduce((total, set) => total + set.stars, 0),
                maxStars: sets.reduce((total, set) => total + set.maxStars, 0),
                progress: topic.words.length
                    ? (learnedCount / topic.words.length) * 100
                    : 0,
            };
        });
    } catch (error) {
        console.log(error);
        return Promise.reject('api.listWordTopics request failed');
    }
}

/**
 * Records a played set. Both the stars and the time keep the learner's best
 * run, so replaying a set to practise can never take a result away.
 */
export async function saveWordSetProgress(
    username: string,
    topicName: string,
    setNumber: number,
    result: WordSetResult,
): Promise<void> {
    try {
        const progressData = readProgress(username) ?? {};
        const topicProgress = progressData[topicName] ?? { sets: {} };
        const previous = topicProgress.sets[String(setNumber)];

        topicProgress.sets[String(setNumber)] = {
            stars: Math.max(previous?.stars ?? 0, result.stars),
            timeMs: previous
                ? Math.min(previous.timeMs, result.timeMs)
                : result.timeMs,
        };

        progressData[topicName] = topicProgress;

        localStorage.setItem(
            getLocalStoragePath(username),
            JSON.stringify(progressData),
        );
    } catch (error) {
        console.log(error);
        return Promise.reject('api.saveWordSetProgress request failed');
    }

    return Promise.resolve();
}
