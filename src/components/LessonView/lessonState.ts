import type { ChallengeAnswer, ChallengeVerdict } from './types';

export type LessonLifecycle = 'help' | 'challenge' | 'complete';

export interface LessonViewState {
    lifecycle: LessonLifecycle;
    challengeNumber: number;
    /** What the learner has entered for the current challenge. */
    answer: ChallengeAnswer;
    /** Set once the answer is checked, which freezes the challenge. */
    verdict: ChallengeVerdict | null;
    correct: number;
    incorrect: number;
}

export type LessonViewAction =
    | { type: 'help-read' }
    | { type: 'answer-change'; answer: ChallengeAnswer }
    | { type: 'answer-check'; verdict: ChallengeVerdict }
    | { type: 'challenge-skipped' }
    | { type: 'challenge-next' }
    | { type: 'lesson-complete' };

export function initialLessonViewState(hasHelp: boolean): LessonViewState {
    return {
        lifecycle: hasHelp ? 'help' : 'challenge',
        challengeNumber: 0,
        answer: [],
        verdict: null,
        correct: 0,
        incorrect: 0,
    };
}

export function lessonViewReducer(
    state: LessonViewState,
    action: LessonViewAction,
): LessonViewState {
    switch (action.type) {
        case 'help-read':
            return { ...state, lifecycle: 'challenge' };

        case 'answer-change':
            // An answer already checked cannot be changed.
            return state.verdict ? state : { ...state, answer: action.answer };

        case 'answer-check':
            if (state.verdict) {
                return state;
            }

            return {
                ...state,
                verdict: action.verdict,
                correct: state.correct + (action.verdict.solved ? 1 : 0),
                incorrect: state.incorrect + (action.verdict.solved ? 0 : 1),
            };

        /**
         * A skipped challenge counts as a wrong answer. Recording that is kept
         * apart from moving on, so the last challenge in a lesson still counts
         * even though there is nothing to move on to.
         */
        case 'challenge-skipped':
            return { ...state, incorrect: state.incorrect + 1 };

        case 'challenge-next':
            return {
                ...state,
                challengeNumber: state.challengeNumber + 1,
                answer: [],
                verdict: null,
            };

        case 'lesson-complete':
            return { ...state, lifecycle: 'complete' };
    }
}
