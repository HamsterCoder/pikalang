import { FunctionComponent } from "react";

// TODO get rid of relative import for components

import './Challenge.css';
import { QuestionChips, QuestionChipsProps } from "./QuestionChips";
import { WordPicture, WordPictureProps } from "./WordPicture";
import { TranslateChips, TranslateChipsProps } from "./TranslateChips";

export enum ChallengeType {
    // IMPELMENTED
    QUESTION_CHIPS, // Given a question, answer it by choosing word chips
    WORD_PICTURE, // Given a word, choose the correct picture
    TRANSLATE_CHIPS, // Given a sentece, translate it by choosing word chips
    // TODO
    PICTURE_WORD, // Given a picture, choose the correct word
    INSERT_CHIPS, // Given a sentence with blanks, fill in by choosing word chips
}

export interface ChallengeProps {
    type: ChallengeType;
    // TODO import all challenge prop types
    data: QuestionChipsProps['data'] | WordPictureProps['data'] | TranslateChipsProps['data'];
    onComplete({solved}: {solved: boolean}): void;
}

export const Challenge: FunctionComponent<ChallengeProps> = ({ type, data, onComplete }) => {
    return (
        <>
            {type === ChallengeType.QUESTION_CHIPS && 
                <QuestionChips type={type} data={data} onComplete={onComplete}/>
            }
            {type === ChallengeType.WORD_PICTURE && 
                <WordPicture type={type} data={data} onComplete={onComplete}/>
            }
            {type === ChallengeType.TRANSLATE_CHIPS && 
                <TranslateChips type={type} data={data} onComplete={onComplete}/>
            }
        </>
    );
};
