/**
 * The redesigned lesson makes the challenge components controlled: they render
 * the subject and collect input, while the lesson shell owns the check, the
 * verdict and the move to the next challenge. Every type reports its answer as
 * a list of strings so the shell never has to know which type it is showing.
 *
 * - chip challenges: the chosen words, in order
 * - insert challenges: one entry per blank, `''` for a blank still empty
 * - picture challenges: the single chosen image, or nothing
 */
export type ChallengeAnswer = string[];

export interface ChallengeVerdict {
    solved: boolean;
    /** The full answer, shown when the learner got it wrong. */
    expected: string;
    /** A second accepted phrasing, shown after a correct answer. */
    alternative?: string;
    /** The meaning of the sentence, shown after a correct answer. */
    translation?: string;
}

export interface ChallengeViewProps<TData> {
    data: TData;
    answer: ChallengeAnswer;
    /** True once the answer has been checked, which freezes the input. */
    locked: boolean;
    onAnswerChange(answer: ChallengeAnswer): void;
}
