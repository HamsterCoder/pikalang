import { useCallback, useEffect, useMemo, useReducer, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';
import { styled } from 'styled-components';

import { getWordSet, isWordSetValid, saveWordSetProgress } from '@api/words';
import { userDataApi } from '@api/user-data';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { Text } from '@components/Text/Text';
import { ChallengePrompt } from '@components/LessonView/ChallengePrompt';
import { LESSON_WIDTH } from '@components/LessonView/LessonView.styles';
import { useStopwatch } from '@hooks/useStopwatch';

import { MatchBoard } from './MatchBoard';
import { WordCard } from './WordCard';
import { WordLessonFooter } from './WordLessonFooter';
import { WordLessonResults } from './WordLessonResults';
import {
    createWordLessonReducer,
    initialWordLessonState,
} from './wordLessonState';
import { WordLessonTopBar } from './WordLessonTopBar';

const Screen = styled.div`
    container-type: inline-size;
    container-name: lesson;

    display: flex;
    flex-direction: column;

    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.surfaceSunken};
`;

/** Sits under the prompt, so the rule above it still opens the screen alone. */
const MatchHint = styled(Text)`
    && {
        margin-top: 0.35rem;
        padding-left: 1.4rem;
        color: ${({ theme }) => theme.color.hint};
    }
`;

const Body = styled.main`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
    flex: 1 1 auto;

    width: 100%;
    max-width: ${LESSON_WIDTH};
    margin: 0 auto;
    padding: 1.5rem 1rem 2rem;
`;

/**
 * A set of new words: each one read in turn, then a timed round matching them
 * to their translations. A star for every word read and every pair matched at
 * the first attempt; the clock is there to beat, never to fail.
 */
export const WordLessonView = () => {
    const { topicName, setNumber } = useParams();
    const parsedSetNumber = Number(setNumber);

    if (
        typeof topicName === 'undefined' ||
        !isWordSetValid(topicName, parsedSetNumber)
    ) {
        throw new Error(
            `Word set ${topicName}/${setNumber} could not be found.`,
        );
    }

    const wordSet = useMemo(
        () => getWordSet(topicName, parsedSetNumber)!,
        [topicName, parsedSetNumber],
    );

    const words = wordSet.words;

    const reducer = useMemo(
        () => createWordLessonReducer(words.length),
        [words.length],
    );

    const [state, dispatch] = useReducer(reducer, initialWordLessonState);

    const stopwatch = useStopwatch();
    const navigate = useNavigate();
    /** Saving is a one-off: the result screen must not write it again. */
    const saved = useRef(false);

    const { start: startClock, stop: stopClock } = stopwatch;

    /** The clock starts the moment the board appears, and only ever once. */
    useEffect(() => {
        if (state.lifecycle === 'match') {
            startClock();
        }
    }, [state.lifecycle, startClock]);

    const stars = state.learnedStars + state.matchStars;
    const maxStars = words.length * 2;

    /** The words, then the matching round, make up the steps of the set. */
    const steps = words.length + 1;
    const completedSteps =
        state.lifecycle === 'word'
            ? state.wordIndex
            : words.length + state.matchedPairs / words.length;

    const matchWords = useMemo(
        () =>
            words.map(({ id, word, translation, gender }) => ({
                id,
                word,
                translation,
                // The gender rides along on the tile: it is the one thing about
                // a Serbian noun the translation cannot tell you.
                caption: translate(I18NLangs.RU, `word-gender-short-${gender}`),
            })),
        [words],
    );

    /**
     * Records the run. Only a set played to the end counts towards the topic,
     * but the stars already earned are kept as experience either way.
     */
    const finish = useCallback(
        async (completed: boolean, timeMs: number, totalStars: number) => {
            if (saved.current) {
                return;
            }

            saved.current = true;

            await userDataApi.saveXPProgress('default', totalStars);

            if (completed) {
                await saveWordSetProgress(
                    'default',
                    topicName,
                    parsedSetNumber,
                    { stars: totalStars, timeMs },
                );
            }

            dispatch({ type: 'lesson-complete' });
        },
        [topicName, parsedSetNumber],
    );

    const onMatchComplete = useCallback(() => {
        const timeMs = stopClock();

        dispatch({ type: 'match-complete', timeMs });
    }, [stopClock]);

    /**
     * The final star is counted in the reducer, so the save waits for the
     * state that `match-complete` leaves behind rather than guessing at it.
     */
    useEffect(() => {
        if (
            state.lifecycle === 'match' &&
            state.matchedPairs === words.length &&
            state.timeMs > 0
        ) {
            void finish(true, state.timeMs, stars);
        }
    }, [
        state.lifecycle,
        state.matchedPairs,
        state.timeMs,
        words.length,
        stars,
        finish,
    ]);

    function exit() {
        if (stars === 0) {
            // Nothing worth showing a result screen for.
            navigate('/words/');
            return;
        }

        void finish(false, stopClock(), stars);
    }

    const word = words[state.wordIndex];

    return (
        <Screen>
            <WordLessonTopBar
                progress={(completedSteps / steps) * 100}
                stars={stars}
                maxStars={maxStars}
                elapsedMs={
                    state.lifecycle === 'match'
                        ? stopwatch.elapsedMs
                        : undefined
                }
                onExit={exit}
            />

            <Body>
                {state.lifecycle === 'word' && (
                    <>
                        <ChallengePrompt>
                            <I18N
                                textKey="word-new-prompt"
                                lang={I18NLangs.RU}
                                values={{
                                    index: state.wordIndex + 1,
                                    total: words.length,
                                }}
                            />
                        </ChallengePrompt>
                        <WordCard
                            key={word.id}
                            word={word.word}
                            translation={word.translation}
                            image={word.image}
                            gender={word.gender}
                            example={word.example}
                            exampleTranslation={word.exampleTranslation}
                            tip={word.tip}
                        />
                    </>
                )}

                {state.lifecycle === 'match' && (
                    <>
                        <div>
                            <ChallengePrompt>
                                <I18N
                                    textKey="word-match-prompt"
                                    lang={I18NLangs.RU}
                                />
                            </ChallengePrompt>
                            <MatchHint type="secondary" withMargin={false}>
                                <I18N
                                    textKey="word-match-hint"
                                    lang={I18NLangs.RU}
                                />
                            </MatchHint>
                        </div>
                        <MatchBoard
                            words={matchWords}
                            onPairMatched={(_id, firstTry) =>
                                dispatch({ type: 'pair-matched', firstTry })
                            }
                            onMistake={() => dispatch({ type: 'mistake' })}
                            onComplete={onMatchComplete}
                        />
                    </>
                )}

                {state.lifecycle === 'complete' && (
                    <>
                        <Heading size="s" color="default">
                            {wordSet.topicDisplayName}
                        </Heading>
                        <WordLessonResults
                            learnedStars={state.learnedStars}
                            matchStars={state.matchStars}
                            wordCount={words.length}
                            timeMs={state.timeMs}
                        />
                        <Text type="secondary" color="default">
                            <I18N
                                textKey="word-complete-xp"
                                lang={I18NLangs.RU}
                                values={{ xp: stars }}
                            />
                        </Text>
                    </>
                )}
            </Body>

            <WordLessonFooter
                lifecycle={state.lifecycle}
                pairsLeft={words.length - state.matchedPairs}
                onKnown={() => dispatch({ type: 'word-skipped' })}
                onContinue={() => dispatch({ type: 'word-read' })}
            />
        </Screen>
    );
};
