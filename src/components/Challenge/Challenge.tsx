import { FunctionComponent } from 'react';

import './Challenge.css';
import { ChallengeDescription, ChallengeType } from './types';
import { QuestionChips, QuestionChipsChallenge } from './QuestionChips';
import { WordPicture, WordPictureChallenge } from './WordPicture';
import { TranslateChips, TranslateChipsChallenge } from './TranslateChips';
import { InsertChips, InsertChipsChallenge } from './InsertChips';

export interface ChallengeProps {
    challenge: ChallengeDescription;
    onComplete({ solved }: { solved: boolean }): void;
}

function isQuestionChips(
    challenge: ChallengeDescription,
): challenge is QuestionChipsChallenge {
    return challenge.type === ChallengeType.QUESTION_CHIPS;
}

function isWordPicture(
    challenge: ChallengeDescription,
): challenge is WordPictureChallenge {
    return challenge.type === ChallengeType.WORD_PICTURE;
}

function isTranslateChips(
    challenge: ChallengeDescription,
): challenge is TranslateChipsChallenge {
    return challenge.type === ChallengeType.TRANSLATE_CHIPS;
}

function isInsertChips(
    challenge: ChallengeDescription,
): challenge is InsertChipsChallenge {
    return challenge.type === ChallengeType.INSERT_CHIPS;
}

export const Challenge: FunctionComponent<ChallengeProps> = ({
    challenge,
    onComplete,
}) => {
    return (
        <>
            {isQuestionChips(challenge) && (
                <QuestionChips challenge={challenge} onComplete={onComplete} />
            )}
            {isWordPicture(challenge) && (
                <WordPicture challenge={challenge} onComplete={onComplete} />
            )}
            {isTranslateChips(challenge) && (
                <TranslateChips challenge={challenge} onComplete={onComplete} />
            )}
            {isInsertChips(challenge) && (
                <InsertChips challenge={challenge} onComplete={onComplete} />
            )}
        </>
    );
};
