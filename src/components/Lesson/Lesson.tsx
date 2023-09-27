import {
    FunctionComponent,
    useCallback,
    useMemo,
    useReducer,
    useState,
} from 'react';
import { styled } from 'styled-components';
import { Link, useParams } from 'react-router-dom';
import { Button, Typography } from '@mui/material';

import { Challenge } from '@components/Challenge/Challenge';
import { Header } from '@components/Header/Header';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { userDataApi } from '@api/user-data';
import {
    getLessonById,
    getLessonDescriptionById,
    isLessonIdValid,
} from '@api/lessons';
import { shuffle } from '@utils/shuffle';

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
    padding: 0 40px;
    margin-bottom: 20px;
`;

const LessonFooter = styled.div`
    padding: 0 40px;
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

export const Lesson: FunctionComponent = () => {
    const [showChallenge, setShowChallenge] = useState(true);
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
        return shuffle(getLessonById(lessonTopic, lessonId)).slice(0, 3);
    }, [lessonTopic, lessonId]);

    const description = useMemo(() => {
        return getLessonDescriptionById(lessonTopic, lessonId);
    }, [lessonTopic, lessonId]);

    const [state, dispatch] = useReducer(lessonStateReducer, {
        challengeNumber: 0,
        challengeStatus: LessonChallengeStatus.PROGRESS,
        complete: false,
        correct: 0,
        incorrect: 0,
    });

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

    return (
        <div>
            <Header>
                <Typography variant="h4">{description.displayName}</Typography>
                <Typography sx={{ marginLeft: 'auto' }} variant="h4">
                    {state.challengeNumber + 1}/{challenges.length}
                </Typography>
            </Header>
            <LessonBody>
                {state.complete && (
                    <div>
                        <Typography variant="h4" gutterBottom>
                            <I18N
                                textKey="lesson-complete-appraisal"
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Typography>
                        <Typography variant="body1">
                            <I18N
                                textKey="lesson-complete-stats"
                                values={{
                                    correct: state.correct,
                                    total: challenges.length,
                                    xp: state.correct,
                                }}
                                lang={I18NLangs.RU}
                            ></I18N>
                        </Typography>
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
                    <Link to="/pikalang/">
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
