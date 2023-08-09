import { QuestionChipsData } from './QuestionChips';
import { TranslateChipsData } from './TranslateChips';
import { WordPictureData } from './WordPicture';
import { InsertChipsData } from './InsertChips';

export enum ChallengeType {
    // IMPELMENTED
    QUESTION_CHIPS, // Given a question, answer it by choosing word chips
    WORD_PICTURE, // Given a word, choose the correct picture
    TRANSLATE_CHIPS, // Given a sentece, translate it by choosing word chips
    INSERT_CHIPS, // Given a sentence with blanks, fill in by choosing word chips
    // TODO
    // PICTURE_WORD, // Given a picture, choose the correct word
}

export type ChallengeDescription = {
  type: ChallengeType.QUESTION_CHIPS,
  data: QuestionChipsData
} | {
  type: ChallengeType.WORD_PICTURE,
  data: WordPictureData
} | {
  type: ChallengeType.TRANSLATE_CHIPS,
  data: TranslateChipsData
} | {
  type: ChallengeType.INSERT_CHIPS,
  data: InsertChipsData
}