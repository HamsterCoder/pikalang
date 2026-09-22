import {
    useCallback,
    useEffect,
    useMemo,
    useReducer,
    useRef,
    useState,
} from 'react';
import { useNavigate, useParams } from 'react-router';
import { styled } from 'styled-components';

import {
    getLessonById,
    getLessonDescriptionById,
    isLessonIdValid,
    saveLessonProgress,
} from '@api/lessons';
import { userDataApi } from '@api/user-data';
import { ChallengeType } from '@lessons/types';
import { ConjugationTable } from '@components/ConjugationTable';
import { NotFoundError } from '@components/ErrorScreen/NotFoundError';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { useSettings } from '@hooks/useSettings';
import { shuffle } from '@utils/shuffle';

import { ChallengePrompt } from './ChallengePrompt';
import { ChallengeStage } from './ChallengeStage';
import { LessonResults } from './LessonResults';
import { ChallengeView } from './ChallengeView';
import { LessonFooter } from './LessonFooter';
import { LessonTopBar } from './LessonTopBar';
import { evaluateChallenge, isAnswerReady, promptKeys } from './evaluate';
import { initialLessonViewState, lessonViewReducer } from './lessonState';
import { LESSON_WIDTH } from './LessonView.styles';

const MAX_CHALLENGES = 10;

const Screen = styled.div`
    container-type: inline-size;
    container-name: lesson;

    display: flex;
    flex-direction: column;

    min-height: 100vh;
    /* A challenge sliding in must not push out a horizontal scrollbar. */
    overflow-x: clip;
    background-color: ${({ theme }) => theme.color.surfaceSunken};
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

export const LessonView = () => {
    const { lessonTopic, lessonId } = useParams();

    if (
        typeof lessonTopic === 'undefined' ||
        typeof lessonId === 'undefined' ||
        !isLessonIdValid(lessonTopic, lessonId)
    ) {
        throw new NotFoundError(
            `${lessonTopic}/${lessonId}`,
            `Lesson ${lessonTopic}/${lessonId} could not be found.`,
        );
    }

    const challenges = useMemo(() => {
        return shuffle(getLessonById(lessonTopic, lessonId)).slice(
            0,
            MAX_CHALLENGES,
        );
    }, [lessonTopic, lessonId]);

    const description = useMemo(() => {
        return getLessonDescriptionById(lessonTopic, lessonId);
    }, [lessonTopic, lessonId]);

    const [state, dispatch] = useReducer(
        lessonViewReducer,
        Boolean(description.help),
        initialLessonViewState,
    );

    const challenge = challenges[state.challengeNumber];
    const answered = state.correct + state.incorrect;
    const navigate = useNavigate();
    const { settings } = useSettings();

    /**
     * Which screen is up — the help, a challenge or the results. Moving on
     * first plays the current one out, and only then takes the step that
     * brings the next one in; the stage is keyed by this, so a new screen
     * mounts fresh and plays its way in.
     */
    const stage =
        state.lifecycle === 'challenge'
            ? `challenge-${state.challengeNumber}`
            : state.lifecycle;
    const [leavingStage, setLeavingStage] = useState<string | null>(null);
    const leaving = leavingStage === stage;
    /**
     * The step waiting for the current screen to leave. It is held until the
     * next screen is up, and is what guards against moving on twice: a second
     * click can land before React re-renders with `leaving`.
     */
    const nextStep = useRef<(() => void) | null>(null);

    useEffect(() => {
        nextStep.current = null;
    }, [stage]);

    const leaveThen = useCallback(
        (step: () => void) => {
            if (nextStep.current) {
                return;
            }

            nextStep.current = step;
            setLeavingStage(stage);
        },
        [stage],
    );

    const onStageLeft = useCallback(() => nextStep.current?.(), []);

    /**
     * Ends the lesson and shows the results. Only a lesson played to the end
     * counts as a try towards the lesson progress, but the XP for the solved
     * challenges is kept either way.
     */
    const finishLesson = useCallback(
        async (countAsTry: boolean) => {
            await userDataApi.saveXPProgress('default', state.correct);

            if (countAsTry) {
                await saveLessonProgress('default', description.id);
            }

            dispatch({ type: 'lesson-complete' });
        },
        [state.correct, description.id],
    );

    const lastChallenge = state.challengeNumber + 1 === challenges.length;

    const advance = useCallback(
        (skipped: boolean) => {
            if (nextStep.current) {
                return;
            }

            if (skipped) {
                dispatch({ type: 'challenge-skipped' });
            }

            leaveThen(() => {
                if (lastChallenge) {
                    void finishLesson(true);
                    return;
                }

                dispatch({ type: 'challenge-next' });
            });
        },
        [leaveThen, lastChallenge, finishLesson],
    );

    const ready = Boolean(challenge) && isAnswerReady(challenge, state.answer);

    const check = useCallback(() => {
        if (!ready || state.verdict || nextStep.current) {
            return;
        }

        dispatch({
            type: 'answer-check',
            verdict: evaluateChallenge(challenge, state.answer),
        });
    }, [ready, state.verdict, state.answer, challenge]);

    function exitLesson() {
        if (answered === 0) {
            // There are no results worth showing yet.
            navigate('/lessons/');
            return;
        }

        void finishLesson(false);
    }

    /**
     * Enter checks the answer and then moves on; the digits pick a picture,
     * matching the numbers shown on the option cards. Both wait on the
     * `hotkeys` setting — a control still answers to Tab and Enter on its own,
     * so nothing here is the only way in.
     */
    useEffect(() => {
        if (state.lifecycle !== 'challenge' || leaving || !settings.hotkeys) {
            return;
        }

        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                event.preventDefault();

                if (state.verdict) {
                    advance(false);
                } else {
                    check();
                }

                return;
            }

            if (
                state.verdict ||
                challenge.type !== ChallengeType.WORD_PICTURE
            ) {
                return;
            }

            const position = Number(event.key);

            if (position >= 1 && position <= challenge.data.images.length) {
                dispatch({
                    type: 'answer-change',
                    answer: [challenge.data.images[position - 1]],
                });
            }
        }

        window.addEventListener('keydown', onKeyDown);

        return () => window.removeEventListener('keydown', onKeyDown);
    }, [
        state.lifecycle,
        leaving,
        state.verdict,
        challenge,
        check,
        advance,
        settings.hotkeys,
    ]);

    return (
        <Screen>
            <LessonTopBar
                current={Math.min(state.challengeNumber + 1, challenges.length)}
                total={challenges.length}
                progress={(answered / challenges.length) * 100}
                onExit={exitLesson}
            />

            <Body>
                <ChallengeStage
                    key={stage}
                    leaving={leaving}
                    onLeft={onStageLeft}
                >
                    {state.lifecycle === 'help' && description.help && (
                        <>
                            <ChallengePrompt>
                                <I18N
                                    textKey="lesson-help-title"
                                    lang={I18NLangs.RU}
                                />
                            </ChallengePrompt>
                            <ConjugationTable
                                verb={description.help.data.verb}
                            />
                        </>
                    )}

                    {state.lifecycle === 'challenge' && (
                        <>
                            <ChallengePrompt>
                                <I18N
                                    textKey={promptKeys[challenge.type]}
                                    lang={I18NLangs.RU}
                                />
                            </ChallengePrompt>
                            <ChallengeView
                                challenge={challenge}
                                answer={state.answer}
                                locked={state.verdict !== null || leaving}
                                onAnswerChange={(answer) =>
                                    dispatch({ type: 'answer-change', answer })
                                }
                            />
                        </>
                    )}

                    {state.lifecycle === 'complete' && (
                        <LessonResults
                            correct={state.correct}
                            answered={answered}
                            total={challenges.length}
                        />
                    )}
                </ChallengeStage>
            </Body>

            <LessonFooter
                lifecycle={state.lifecycle}
                verdict={state.verdict}
                canCheck={ready}
                onStart={() => leaveThen(() => dispatch({ type: 'help-read' }))}
                onSkip={() => advance(true)}
                onCheck={check}
                onContinue={() => advance(false)}
            />
        </Screen>
    );
};
