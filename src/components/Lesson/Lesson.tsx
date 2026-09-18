import { useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { styled } from 'styled-components';
import { Link, useNavigate, useParams } from 'react-router';
import { X as CloseIcon } from 'lucide-react';
import { Button } from '@components/ui/Button';
import { IconButton } from '@components/ui/IconButton';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Tooltip } from '@components/ui/Tooltip';

import { Challenge } from '@components/Challenge/Challenge';
import { BaseHeader, HeaderContainer } from '@components/Header/Header.styles';
import { Heading } from '@components/Heading';
import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { userDataApi } from '@api/user-data';
import {
    getLessonById,
    getLessonDescriptionById,
    isLessonIdValid,
    saveLessonProgress,
} from '@api/lessons';
import { shuffle } from '@utils/shuffle';
import { EnvContext } from '@routes/EnvContext';
import { Text } from '@components/Text/Text';
import { EllipsisHeading } from '@components/EllipsisHeading';
import {
    ConjugationTable,
    ConjugationTableProps,
} from '@components/ConjugationTable';

export type LessonHelpType = 'conjugation';

export interface LessonHelp {
    type: LessonHelpType;
    // TODO: make it more generic supporting other help types
    data: {
        verb: ConjugationTableProps['verb'];
    };
}

export interface LessonDescription {
    id: string;
    name: string;
    displayName: string;
    topic: string;
    displayTopic: string;
    description: string;
    image: string;
    help?: LessonHelp;
}

const LessonTitle = styled(EllipsisHeading)`
    flex-shrink: 1;
    margin-right: 1rem;
`;

/**
 * The explicit flex basis keeps the bar from claiming the full header width
 * (the track itself is `width: 100%`) and squeezing out the lesson name.
 */
const LessonProgress = styled(ProgressBar)`
    flex: 1 1 4rem;
    max-width: 24rem;
    margin: 0 1rem 0 auto;
    border-radius: ${({ theme }) => theme.radius.pill};
`;

const LessonBody = styled.div`
    padding: 0 2rem;
    margin-bottom: 1rem;
`;

const LessonFooter = styled.div`
    padding: 0 2rem;
`;

enum LessonChallengeStatus {
    PROGRESS,
    SAVING,
    COMPLETE,
}

type LIFECYCLE = 'help' | 'challenge' | 'complete';

interface LessonState {
    lifecycle: LIFECYCLE;
    challengeNumber: number;
    challengeStatus: LessonChallengeStatus;
    correct: number;
    incorrect: number;
}

enum LessonActionType {
    COMPLETE_LESSON,
    COMPLETE_CHALLENGE,
    SHOW_NEXT_CHALLENGE,
    HELP_READ,
}

interface LessonAction {
    type: LessonActionType;
    data?: {
        solved: boolean;
    };
}

function lessonStateReducer(
    state: LessonState,
    { type, data }: LessonAction,
): LessonState {
    if (type === LessonActionType.COMPLETE_LESSON) {
        return {
            ...state,
            lifecycle: 'complete',
        };
    } else if (type === LessonActionType.COMPLETE_CHALLENGE) {
        const updatedState: Partial<LessonState> = {};

        if (data?.solved) {
            updatedState.correct = state.correct + 1;
        } else {
            updatedState.incorrect = state.incorrect + 1;
        }

        return {
            ...state,
            ...updatedState,
            challengeStatus: LessonChallengeStatus.COMPLETE,
        };
    } else if (type === LessonActionType.SHOW_NEXT_CHALLENGE) {
        return {
            ...state,
            challengeNumber: state.challengeNumber + 1,
            challengeStatus: LessonChallengeStatus.PROGRESS,
        };
    } else if (type === LessonActionType.HELP_READ) {
        return {
            ...state,
            lifecycle: 'challenge',
        };
    }

    return state;
}

const MAX_CHALLENGES = 10;

export const Lesson = () => {
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

    const [showChallenge, setShowChallenge] = useState(true);
    const [state, dispatch] = useReducer(lessonStateReducer, {
        // TODO show help window before starting the lesson
        lifecycle: description.help ? 'help' : 'challenge',
        challengeNumber: 0,
        challengeStatus: LessonChallengeStatus.PROGRESS,
        correct: 0,
        incorrect: 0,
    });

    function onChallengeComplete(data: LessonAction['data']) {
        dispatch({ type: LessonActionType.COMPLETE_CHALLENGE, data });
    }

    function onHelpRead() {
        dispatch({ type: LessonActionType.HELP_READ });
    }

    const answered = state.correct + state.incorrect;

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

            dispatch({ type: LessonActionType.COMPLETE_LESSON });
        },
        [state.correct, description.id],
    );

    const navigate = useNavigate();

    function exitLesson() {
        if (answered === 0) {
            // There are no results worth showing yet.
            navigate('/lessons/');
            return;
        }

        void finishLesson(false);
    }

    async function showNextChallenge() {
        if (state.challengeNumber + 1 === challenges.length) {
            await finishLesson(true);
        } else {
            setShowChallenge(false);
            dispatch({ type: LessonActionType.SHOW_NEXT_CHALLENGE });
            setTimeout(() => {
                setShowChallenge(true);
            }, 20);
        }
    }

    const { mobile } = useContext(EnvContext);

    return (
        <div>
            <HeaderContainer>
                <BaseHeader>
                    <LessonTitle size="l" color="inverted" mobile={mobile}>
                        {description.displayName}
                    </LessonTitle>
                    <LessonProgress
                        tone="inverted"
                        value={(answered / challenges.length) * 100}
                        aria-label={translate(
                            I18NLangs.RU,
                            'lesson-progress-label',
                        )}
                    />
                    {state.lifecycle !== 'complete' && (
                        <Tooltip
                            title={
                                <I18N
                                    textKey="lesson-exit-button"
                                    lang={I18NLangs.RU}
                                ></I18N>
                            }
                            side="bottom"
                        >
                            <IconButton
                                aria-label={translate(
                                    I18NLangs.RU,
                                    'lesson-exit-button',
                                )}
                                onClick={exitLesson}
                            >
                                <CloseIcon aria-hidden />
                            </IconButton>
                        </Tooltip>
                    )}
                </BaseHeader>
            </HeaderContainer>
            <LessonBody>
                {state.lifecycle === 'help' && description.help && (
                    <div>
                        <Heading size="m" color="default" gutter>
                            <I18N
                                textKey="lesson-help-title"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Heading>
                        <ConjugationTable
                            verb={description.help.data.verb}
                        ></ConjugationTable>
                        <Button tone="success" onClick={onHelpRead}>
                            <I18N
                                textKey="lesson-start-button"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Button>
                    </div>
                )}
                {state.lifecycle === 'challenge' && showChallenge && (
                    <Challenge
                        challenge={challenges[state.challengeNumber]}
                        onComplete={onChallengeComplete}
                    />
                )}
                {state.lifecycle === 'complete' && (
                    <div>
                        <Heading size="m" color="default" gutter>
                            <I18N
                                textKey="lesson-complete-appraisal"
                                lang={I18NLangs.RU}
                            ></I18N>
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
                            ></I18N>
                        </Text>
                    </div>
                )}
            </LessonBody>
            <LessonFooter>
                {state.lifecycle === 'complete' && (
                    <Link to="/lessons/">
                        <Button tone="success">
                            <I18N
                                textKey="lesson-complete-to-lesson-list"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Button>
                    </Link>
                )}
                {state.lifecycle === 'challenge' &&
                    state.challengeStatus ===
                        LessonChallengeStatus.COMPLETE && (
                        <Button tone="success" onClick={showNextChallenge}>
                            <I18N
                                textKey="lesson-next-button"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Button>
                    )}
            </LessonFooter>
        </div>
    );
};
