import {
    ChallengeDescription,
    ChallengeType,
} from '@components/Challenge/types';
import {
    computeAnswer,
    countMissingWords,
    isCorrectAnswer,
    parseSentence,
    prepareAnotherAnswer,
} from '@components/Challenge/utils';
import { dictionary } from '@dictionary/serbian-course';

import type { ChallengeAnswer, ChallengeVerdict } from './types';

/** The `word-picture-prompt`-style key naming the task for each challenge. */
export const promptKeys: Record<ChallengeType, string> = {
    [ChallengeType.QUESTION_CHIPS]: 'question-chips-prompt',
    [ChallengeType.WORD_PICTURE]: 'word-picture-prompt',
    [ChallengeType.TRANSLATE_CHIPS]: 'translate-chips-prompt',
    [ChallengeType.INSERT_CHIPS]: 'insert-chips-prompt',
};

/** Whether there is enough input to be worth checking. */
export function isAnswerReady(
    challenge: ChallengeDescription,
    answer: ChallengeAnswer,
): boolean {
    if (challenge.type === ChallengeType.WORD_PICTURE) {
        return answer.length === 1;
    }

    if (challenge.type === ChallengeType.INSERT_CHIPS) {
        return (
            answer.filter((chip) => chip !== '').length ===
            countMissingWords(challenge.data.sentence)
        );
    }

    return answer.length > 0;
}

export function evaluateChallenge(
    challenge: ChallengeDescription,
    answer: ChallengeAnswer,
): ChallengeVerdict {
    if (challenge.type === ChallengeType.WORD_PICTURE) {
        const { word } = challenge.data;

        return {
            // `Picture` names its images after the English word, hyphenated.
            solved: dictionary[word]['en'].replace(/ /g, '-') === answer[0],
            expected: dictionary[word]['ru'],
        };
    }

    if (challenge.type === ChallengeType.INSERT_CHIPS) {
        const { missingWords } = parseSentence(challenge.data.sentence);

        return {
            solved: missingWords.every((word, index) => answer[index] === word),
            expected: computeAnswer(challenge.data.sentence),
            translation: challenge.data.translation,
        };
    }

    const { answer: accepted } = challenge.data;

    return {
        solved: isCorrectAnswer(accepted, answer),
        expected: accepted[0],
        alternative: prepareAnotherAnswer(accepted, answer),
    };
}
