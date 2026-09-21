import { ChallengeDescription, ChallengeType } from '@lessons/types';

import { InsertChipsView } from './InsertChipsView';
import { QuestionChipsView } from './QuestionChipsView';
import { TranslateChipsView } from './TranslateChipsView';
import { WordPictureView } from './WordPictureView';

import type { ChallengeAnswer } from './types';

export interface ChallengeViewSwitchProps {
    challenge: ChallengeDescription;
    answer: ChallengeAnswer;
    locked: boolean;
    onAnswerChange(answer: ChallengeAnswer): void;
}

/**
 * Picks the view for a challenge. Unlike the components under `Challenge/`,
 * these are controlled: the lesson shell owns the answer, the check and the
 * verdict, so every challenge type shares one footer and one feedback dock.
 */
export const ChallengeView = ({
    challenge,
    ...rest
}: ChallengeViewSwitchProps) => {
    switch (challenge.type) {
        case ChallengeType.QUESTION_CHIPS:
            return <QuestionChipsView data={challenge.data} {...rest} />;
        case ChallengeType.WORD_PICTURE:
            return <WordPictureView data={challenge.data} {...rest} />;
        case ChallengeType.TRANSLATE_CHIPS:
            return <TranslateChipsView data={challenge.data} {...rest} />;
        case ChallengeType.INSERT_CHIPS:
            return <InsertChipsView data={challenge.data} {...rest} />;
    }
};
