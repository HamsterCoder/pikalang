/**
 * The word lesson runs in three stages: the new words one at a time, then the
 * timed round matching them to their translations, then the result.
 */
export type WordLessonLifecycle = 'word' | 'match' | 'complete';

export interface WordLessonState {
    lifecycle: WordLessonLifecycle;
    /** Which of the new words is on screen, counting from zero. */
    wordIndex: number;
    /** A star for every word read rather than skipped. */
    learnedStars: number;
    /** A star for every pair matched without a wrong guess first. */
    matchStars: number;
    /** Pairs put together, whether or not they earned their star. */
    matchedPairs: number;
    mistakes: number;
    /** How long the matching round took, in ms. Set when it ends. */
    timeMs: number;
}

export type WordLessonAction =
    | { type: 'word-read' }
    | { type: 'word-skipped' }
    | { type: 'pair-matched'; firstTry: boolean }
    | { type: 'mistake' }
    | { type: 'match-complete'; timeMs: number }
    | { type: 'lesson-complete' };

export const initialWordLessonState: WordLessonState = {
    lifecycle: 'word',
    wordIndex: 0,
    learnedStars: 0,
    matchStars: 0,
    matchedPairs: 0,
    mistakes: 0,
    timeMs: 0,
};

/**
 * Moves past the word on screen, into the matching round once they run out.
 * `wordCount` is passed in because the reducer has no other way to know when
 * the last card has been turned.
 */
function advance(state: WordLessonState, wordCount: number): WordLessonState {
    const next = state.wordIndex + 1;

    return next >= wordCount
        ? { ...state, lifecycle: 'match' }
        : { ...state, wordIndex: next };
}

export function createWordLessonReducer(wordCount: number) {
    return function wordLessonReducer(
        state: WordLessonState,
        action: WordLessonAction,
    ): WordLessonState {
        switch (action.type) {
            case 'word-read':
                return advance(
                    { ...state, learnedStars: state.learnedStars + 1 },
                    wordCount,
                );

            case 'word-skipped':
                // Saying you already know it is honest, and it earns nothing.
                return advance(state, wordCount);

            case 'pair-matched':
                return {
                    ...state,
                    matchedPairs: state.matchedPairs + 1,
                    matchStars: action.firstTry
                        ? state.matchStars + 1
                        : state.matchStars,
                };

            case 'mistake':
                return { ...state, mistakes: state.mistakes + 1 };

            case 'match-complete':
                return { ...state, timeMs: action.timeMs };

            case 'lesson-complete':
                return { ...state, lifecycle: 'complete' };

            default:
                return state;
        }
    };
}
