import { FunctionComponent } from "react";

// TODO get rid of relative import for components

import './Challenge.css';
import { QuestionToChips } from "./QuestionToChips";

export enum ChallengeType {
    QUESTION_TO_CHIPS, // Given a question, answer it by choosing word chips
    WORD_TO_PICTURE, // Given a word, choose the correct picture
    PICTURE_TO_WORD, // Given a picture, choose the correct word
}

export enum ChallengeStatus {
    PROGRESS,
    CORRECT,
    INCORRECT
}

export interface ChallengeProps {
    type: ChallengeType;
    // TODO figure out how best to type this
    data: Record<string, any>;
}

export const Challenge: FunctionComponent<ChallengeProps> = ({ type, data }) => {
    return (
        <div className="container">
            {type === ChallengeType.QUESTION_TO_CHIPS && 
                <QuestionToChips type={type} data={data}/>
            }
        </div>
    );
};
