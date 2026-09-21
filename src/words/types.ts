import type { DictionaryKeys } from '@dictionary/serbian-course';

/**
 * The shape of the word library. A word topic is a themed list of words the
 * learner meets four at a time; everything a topic file under `srb-ru/` writes
 * is described here, the way `@lessons/types` describes lesson content.
 */

/**
 * Grammatical gender, which decides the article-less agreement Serbian puts on
 * adjectives. Every word in the library so far is a noun, so it is required.
 */
export type WordGender = 'm' | 'f' | 'n';

export interface WordEntry {
    /**
     * The dictionary key, which is also the Serbian word as it is displayed.
     * The Russian translation and the illustration are looked up from
     * `@dictionary/serbian-course`, so they are never written twice.
     */
    id: DictionaryKeys;
    gender: WordGender;
    /** A short Serbian sentence putting the word to work. */
    example: string;
    /** The Russian rendering of `example`. */
    exampleTranslation: string;
    /**
     * A note shown under the example. Every word currently carries where the
     * stress falls, which is the one thing neither the spelling nor the
     * translation tells a Russian speaker.
     */
    tip?: string;
}

export interface WordTopicDescription {
    /** Matches the `:topicName` route param, so it has no slash in it. */
    name: string;
    displayName: string;
    description: string;
    /** A bare asset name from `public/assets/`, used as the topic's cover. */
    image: string;
    words: WordEntry[];
}
