import { useCallback, useContext, useMemo, useReducer, useState } from 'react';
import { styled } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Button } from '@mui/material';

import { Challenge } from '@components/Challenge/Challenge';
import { BaseHeader, HeaderContainer } from '@components/Header/Header';
import { Heading } from '@components/Heading';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { userDataApi } from '@api/user-data';
import {
    getLessonById,
    getLessonDescriptionById,
    isLessonIdValid,
} from '@api/lessons';
import { shuffle } from '@utils/shuffle';
import { EnvContext } from '@routes/App';
import { Text } from '@components/Text/Text';

export interface LessonDescription {
    id: string;
    name: string;
    displayName: string;
    topic: string;
    displayTopic: string;
    description: string;
    image: string;
}

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

interface LessonState {
    challengeNumber: number;
    challengeStatus: LessonChallengeStatus;
    complete: boolean;
    correct: number;
    incorrect: number;
}

enum LessonActionType {
    COMPLETE_LESSON,
    COMPLETE_CHALLENGE,
    SHOW_NEXT_CHALLENGE,
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
            complete: true,
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
    }

    return state;
}

const MAX_CHALLENGES = 10;

export const Lesson = () => {
    const [showChallenge, setShowChallenge] = useState(true);
    const [state, dispatch] = useReducer(lessonStateReducer, {
        challengeNumber: 0,
        challengeStatus: LessonChallengeStatus.PROGRESS,
        complete: false,
        correct: 0,
        incorrect: 0,
    });
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

    function onChallengeComplete(data: LessonAction['data']) {
        dispatch({ type: LessonActionType.COMPLETE_CHALLENGE, data });
    }

    const saveProgress = useCallback(async () => {
        await userDataApi.saveLessonProgress(
            'default',
            description.id,
            state.correct,
        );
    }, [state, description]);

    async function showNextChallenge() {
        if (state.challengeNumber + 1 === challenges.length) {
            await saveProgress();

            dispatch({ type: LessonActionType.COMPLETE_LESSON });
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
                    <Heading size="l" color="inverted" mobile={mobile}>
                        {description.displayName}
                    </Heading>
                    <Heading
                        size="l"
                        color="inverted"
                        mobile={mobile}
                        sx={{ marginLeft: 'auto' }}
                    >
                        {state.challengeNumber + 1}/{challenges.length}
                    </Heading>
                </BaseHeader>
            </HeaderContainer>
            <LessonBody>
                {state.complete && (
                    <div>
                        <Heading
                            size="m"
                            color="default"
                            sx={{ marginBottom: '1rem' }}
                        >
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
                                    total: challenges.length,
                                    xp: state.correct,
                                }}
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Text>
                    </div>
                )}
                {!state.complete && showChallenge && (
                    <Challenge
                        challenge={challenges[state.challengeNumber]}
                        onComplete={onChallengeComplete}
                    />
                )}
            </LessonBody>
            <LessonFooter>
                {state.complete && (
                    <Link to="/lessons/">
                        <Button color="success" variant="contained">
                            <I18N
                                textKey="lesson-complete-to-lesson-list"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Button>
                    </Link>
                )}
                {!state.complete &&
                    state.challengeStatus ===
                        LessonChallengeStatus.COMPLETE && (
                        <Button
                            color="success"
                            variant="contained"
                            onClick={showNextChallenge}
                        >
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
