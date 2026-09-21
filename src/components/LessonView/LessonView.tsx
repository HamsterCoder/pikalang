import { useCallback, useEffect, useMemo, useReducer } from 'react';
import { useNavigate, useParams } from 'react-router';
import { styled } from 'styled-components';
import { X as CloseIcon } from 'lucide-react';

import {
    getLessonById,
    getLessonDescriptionById,
    isLessonIdValid,
    saveLessonProgress,
} from '@api/lessons';
import { userDataApi } from '@api/user-data';
import { ChallengeType } from '@components/Challenge/types';
import { ConjugationTable } from '@components/ConjugationTable';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { Text } from '@components/Text/Text';
import { Button } from '@components/ui/Button';
import { ButtonLink } from '@components/ui/ButtonLink';
import { IconButton } from '@components/ui/IconButton';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Tooltip } from '@components/ui/Tooltip';
import { shuffle } from '@utils/shuffle';

import { ChallengeView } from './ChallengeView';
import { FeedbackDock } from './FeedbackDock';
import { evaluateChallenge, isAnswerReady, promptKeys } from './evaluate';
import { initialLessonViewState, lessonViewReducer } from './lessonState';
import { LESSON_WIDTH, LessonRow } from './LessonView.styles';

const MAX_CHALLENGES = 10;

const Screen = styled.div`
    container-type: inline-size;
    container-name: lesson;

    display: flex;
    flex-direction: column;

    min-height: 100vh;
    background-color: ${({ theme }) => theme.color.surfaceSunken};
`;

const TopBar = styled.header`
    position: sticky;
    top: 0;
    z-index: 5;

    padding: 0.75rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    background-color: ${({ theme }) => theme.color.surface};
`;

const Track = styled(ProgressBar)`
    flex: 1 1 auto;
    border-radius: ${({ theme }) => theme.radius.pill};
`;

const Counter = styled.span`
    flex-shrink: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    font-weight: 500;
    color: ${({ theme }) => theme.color.hint};
    font-variant-numeric: tabular-nums;
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

/** The accent rule that opens every challenge, as in the design. */
const Prompt = styled.div`
    display: flex;
    align-items: center;
    gap: 0.75rem;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.heading_s.size};
    font-weight: ${({ theme }) => theme.text.heading_s.weight};
    color: ${({ theme }) => theme.color.heading};

    &::before {
        content: '';

        width: 6px;
        height: 1.25rem;
        border-radius: ${({ theme }) => theme.radius.pill};

        background-color: ${({ theme }) => theme.color.accent};
    }
`;

const Footer = styled.footer`
    position: sticky;
    bottom: 0;
    z-index: 5;

    border-top: 1px solid ${({ theme }) => theme.color.border};
    background-color: ${({ theme }) => theme.color.surface};
`;

const Actions = styled(LessonRow)`
    justify-content: space-between;
    padding-block: 0.75rem;
`;

/**
 * The redesigned lesson screen, built against `stitch/lesson-1.html` and
 * `stitch/lesson-2.html`. It lives beside `Lesson` rather than replacing it,
 * so the two can be compared before one is retired.
 */
export const LessonView = () => {
    const { lessonTopic, lessonId } = useParams();

    if (
        typeof lessonTopic === 'undefined' ||
        typeof lessonId === 'undefined' ||
        !isLessonIdValid(lessonTopic, lessonId)
    ) {
        throw new Error(
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
            if (skipped) {
                dispatch({ type: 'challenge-skipped' });
            }

            if (lastChallenge) {
                void finishLesson(true);
                return;
            }

            dispatch({ type: 'challenge-next' });
        },
        [lastChallenge, finishLesson],
    );

    const ready = Boolean(challenge) && isAnswerReady(challenge, state.answer);

    const check = useCallback(() => {
        if (!ready || state.verdict) {
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
     * matching the numbers shown on the option cards.
     */
    useEffect(() => {
        if (state.lifecycle !== 'challenge') {
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
    }, [state.lifecycle, state.verdict, challenge, check, advance]);

    return (
        <Screen>
            <TopBar>
                <LessonRow>
                    <Tooltip
                        title={
                            <I18N
                                textKey="lesson-exit-button"
                                lang={I18NLangs.RU}
                            />
                        }
                        side="bottom"
                    >
                        <IconButton
                            tone="default"
                            aria-label={translate(
                                I18NLangs.RU,
                                'lesson-exit-button',
                            )}
                            onClick={exitLesson}
                        >
                            <CloseIcon aria-hidden />
                        </IconButton>
                    </Tooltip>
                    <Track
                        tone="muted"
                        value={(answered / challenges.length) * 100}
                        aria-label={translate(
                            I18NLangs.RU,
                            'lesson-progress-label',
                        )}
                    />
                    <Counter>
                        {Math.min(state.challengeNumber + 1, challenges.length)}{' '}
                        / {challenges.length}
                    </Counter>
                </LessonRow>
            </TopBar>

            <Body>
                {state.lifecycle === 'help' && description.help && (
                    <>
                        <Prompt>
                            <I18N
                                textKey="lesson-help-title"
                                lang={I18NLangs.RU}
                            />
                        </Prompt>
                        <ConjugationTable verb={description.help.data.verb} />
                    </>
                )}

                {state.lifecycle === 'challenge' && (
                    <>
                        <Prompt>
                            <I18N
                                textKey={promptKeys[challenge.type]}
                                lang={I18NLangs.RU}
                            />
                        </Prompt>
                        <ChallengeView
                            // A fresh challenge starts from a clean slate.
                            key={state.challengeNumber}
                            challenge={challenge}
                            answer={state.answer}
                            locked={state.verdict !== null}
                            onAnswerChange={(answer) =>
                                dispatch({ type: 'answer-change', answer })
                            }
                        />
                    </>
                )}

                {state.lifecycle === 'complete' && (
                    <>
                        <Heading size="m" color="default" gutter>
                            <I18N
                                textKey="lesson-complete-appraisal"
                                lang={I18NLangs.RU}
                            />
                        </Heading>
                        <Text type="primary" color="default">
                            <I18N
                                textKey="lesson-complete-stats"
                                values={{
                                    correct: state.correct,
                                    total: answered,
                                    xp: state.correct,
                                }}
                                lang={I18NLangs.RU}
                            />
                        </Text>
                    </>
                )}
            </Body>

            <Footer>
                {state.lifecycle === 'help' && (
                    <Actions>
                        <span />
                        <Button
                            tone="success"
                            onClick={() => dispatch({ type: 'help-read' })}
                        >
                            <I18N
                                textKey="lesson-start-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                    </Actions>
                )}

                {state.lifecycle === 'challenge' && !state.verdict && (
                    <Actions>
                        <Button variant="text" onClick={() => advance(true)}>
                            <I18N
                                textKey="lesson-skip-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                        <Button
                            tone="success"
                            disabled={!ready}
                            onClick={check}
                        >
                            <I18N
                                textKey="lesson-submit-button"
                                lang={I18NLangs.RU}
                            />
                        </Button>
                    </Actions>
                )}

                {state.lifecycle === 'challenge' && state.verdict && (
                    <FeedbackDock
                        verdict={state.verdict}
                        onContinue={() => advance(false)}
                    />
                )}

                {state.lifecycle === 'complete' && (
                    <Actions>
                        <span />
                        <ButtonLink to="/lessons/" tone="success">
                            <I18N
                                textKey="lesson-complete-to-lesson-list"
                                lang={I18NLangs.RU}
                            />
                        </ButtonLink>
                    </Actions>
                )}
            </Footer>
        </Screen>
    );
};
