import { Typography, Button, Alert } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";

export enum ChallengeStatus {
    PROGRESS,
    CORRECT,
    INCORRECT
}

export interface CheckAnswerControlProps {
    checkAnswer(): boolean;
    expectedAnswer: string;
    onSubmit({ solved }: {solved: boolean}): void;
}

export const CheckAnswerControl: FunctionComponent<CheckAnswerControlProps> = ({ onSubmit, checkAnswer,expectedAnswer }) => {
    const [status, setStatus] = useState<ChallengeStatus>(ChallengeStatus.PROGRESS);

    const handleSubmit = useCallback(function () {
        const answerIsCorrect = checkAnswer();

        if (answerIsCorrect) {
            setStatus(ChallengeStatus.CORRECT);
            onSubmit({ solved: true });
        } else {
            setStatus(ChallengeStatus.INCORRECT);
            onSubmit({ solved: false });
        }
    }, [onSubmit, checkAnswer]);

    return (
        <>
            {status === ChallengeStatus.PROGRESS && <Button color="success" variant="contained" sx={{ borderRadius: '8px' }} onClick={handleSubmit}>Check</Button>}
            {status === ChallengeStatus.CORRECT && <Alert severity="success">The answer is correct</Alert>}
            {status === ChallengeStatus.INCORRECT && <Alert severity="error">
                <Typography variant="body1">Incorrect. Expected answer: {expectedAnswer}</Typography>
            </Alert>}
        </>
    );
};