import { FunctionComponent } from "react";

// TODO get rid of relative import for components

import './Challenge.css';
import { QuestionChips, QuestionChipsProps } from "./QuestionChips";
import { WordPicture, WordPictureProps } from "./WordPicture";
import { TranslateChips, TranslateChipsProps } from "./TranslateChips";
import { ChallengeType } from "./types";

export interface ChallengeProps {
    type: ChallengeType;
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
