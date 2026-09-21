import type { ConjugationTableProps } from '@components/ConjugationTable';
import type { DictionaryKeys } from '@dictionary/serbian-course';

/**
 * The shape of lesson content. Everything a lesson file under `srb-ru/` or
 * `srb-en/` writes is described here, so an author has one module to import
 * from and the views can be replaced without the content moving.
 */

export type LessonHelpType = 'conjugation';

export interface LessonHelp {
    type: LessonHelpType;
    // TODO: make it more generic supporting other help types
    data: {
        verb: ConjugationTableProps['verb'];
    };
}

export interface LessonDescription {
    /** `"<topic>/<name>"`, and it must match the lesson's URL params. */
    id: string;
    name: string;
    displayName: string;
    topic: string;
    displayTopic: string;
    description: string;
    image: string;
    help?: LessonHelp;
}

export enum ChallengeType {
    QUESTION_CHIPS, // Given a question, answer it by choosing word chips
    WORD_PICTURE, // Given a word, choose the correct picture
    TRANSLATE_CHIPS, // Given a sentece, translate it by choosing word chips
    INSERT_CHIPS, // Given a sentence with blanks, fill in by choosing word chips
    // TODO
    // PICTURE_WORD, // Given a picture, choose the correct word
}

export interface QuestionChipsData {
    image?: string;
    question: string;
    questionHint: string;
    answer: string[];
    chips: string[];
}

export interface WordPictureData {
    images: string[];
    word: DictionaryKeys;
}

/**
 * A challenge either lists the words on offer outright, or gives the wrong
 * ones only and lets the right ones come from the accepted answers.
 */
export type TranslateChipsData =
    | {
          sentence: string;
          answer: string[];
          wrongChips: string[];
      }
    | {
          sentence: string;
          answer: string[];
          chips: string[];
      };

export interface InsertChipsData {
    /** Blanks are written in braces: `'Ja {razumem} srpski.'`. */
    sentence: string;
    translation: string;
    chips: string[];
}

export type ChallengeDescription =
    | {
          type: ChallengeType.QUESTION_CHIPS;
          data: QuestionChipsData;
      }
    | {
          type: ChallengeType.WORD_PICTURE;
          data: WordPictureData;
      }
    | {
          type: ChallengeType.TRANSLATE_CHIPS;
          data: TranslateChipsData;
      }
    | {
          type: ChallengeType.INSERT_CHIPS;
          data: InsertChipsData;
      };
