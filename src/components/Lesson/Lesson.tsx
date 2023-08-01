import { FunctionComponent, useCallback, useReducer, useState } from "react";
import { styled } from "styled-components";
import { Button, Typography } from "@mui/material";

import { Challenge } from "../Challenge/Challenge";
import { ChallengeDescription } from "../Challenge/types";
import { Header } from "../Header/Header";
import { userDataApi } from "../../api/user-data";

export interface LessonDescription {
    id: string;
    name: string;
    topic: string;
    description: string;
    image: string;
    url: string;
}

export interface LessonProps {
    description: LessonDescription;
    challenges: ChallengeDescription[];
    onComplete(id: string): void;
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
    COMPLETE
}

interface LessonState {
    challengeNumber: number;
    challengeStatus: LessonChallengeStatus,
    complete: boolean;
    correct: number;
    incorrect: number;
}

enum LessonActionType {
    COMPLETE_LESSON,
    COMPLETE_CHALLENGE,
    SHOW_NEXT_CHALLENGE
}

interface LessonAction {
    type: LessonActionType,
    data?: {
        solved: boolean,
    }
}

function lessonStateReducer(state: LessonState, {type, data}: LessonAction): LessonState {
    if (type === LessonActionType.COMPLETE_LESSON) {
        return {
            ...state,
            complete: true
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
            challengeStatus: LessonChallengeStatus.COMPLETE
        };
    } else if (type === LessonActionType.SHOW_NEXT_CHALLENGE) {
        return {
            ...state,
            challengeNumber: state.challengeNumber + 1,
            challengeStatus: LessonChallengeStatus.PROGRESS
        };
    }

    return state;
}

export const Lesson: FunctionComponent<LessonProps> = ({ challenges, description, onComplete }) => {
    const [showChallenge, setShowChallenge] = useState(true);

    const [state, dispatch] = useReducer(lessonStateReducer, {
        challengeNumber: 0,
        challengeStatus: LessonChallengeStatus.PROGRESS,
        complete: false,   
        correct: 0,
        incorrect: 0
    });

    const handleLessonComplete = useCallback(() => {
        onComplete(description.id);
    }, [description, onComplete]);

    function onChallengeComplete(data: LessonAction['data']) {
        // TODO pass in completion status
        dispatch({ type: LessonActionType.COMPLETE_CHALLENGE, data });
    }

    const saveProgress = useCallback(async () => {
        let updatedUserData = userDataApi.getUserData('default');

        updatedUserData.xp += 10;
        updatedUserData.lessons[description.id] = updatedUserData.lessons[description.id] || {
            completed: 1,
            threshold: 4
        };

        await userDataApi.setUserdata('default', updatedUserData);
    }, [description]);

    async function showNextChallenge() {
        if (state.challengeNumber + 1 === challenges.length) {
            // TODO Show a loader
            // Write lesson completion and XP to local storage
            // Show lesson end screen
            
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

    // TODO Lesson complete screen (simple)
    // - Congratulations, you've completed the lesson
    // - Accuracy 100%, 95% etc
    // - Go to lesson list button

    // TODO Disable check button if input is empty

    // IMP Duolingo has a nice slide, fade in animation for changing the challenges

    return (
        <div>
            <Header>
                <Typography variant="h4">{description.name}</Typography>
                <Typography sx={{ marginLeft: 'auto' }} variant="h4">{state.challengeNumber + 1}/{challenges.length}</Typography>
            </Header>
            <LessonBody>
                {state.complete && <div>
                    <Typography variant="h4">Congratulations</Typography>
                    <Typography variant="h5">You have completed the lesson</Typography>
                    <Typography variant="body1">Correct challenges: {state.correct} / {challenges.length}</Typography>
                </div>}
                {!state.complete && showChallenge && <Challenge {...challenges[state.challengeNumber]} onComplete={onChallengeComplete}/>}
            </LessonBody>
            <LessonFooter>
                {state.complete && <Button color="success" variant="contained" onClick={handleLessonComplete}>See other lessons</Button>}
                {!state.complete && state.challengeStatus === LessonChallengeStatus.COMPLETE && <Button color="success" variant="contained" onClick={showNextChallenge}>Continue</Button>}
            </LessonFooter>
        </div>
    );
};
