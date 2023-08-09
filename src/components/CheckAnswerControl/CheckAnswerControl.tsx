import { Typography, Button, Alert } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";


import { I18N, I18NLangs } from "../I18N/I18N";

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
            {status === ChallengeStatus.PROGRESS && <Button color="success" variant="contained" onClick={handleSubmit}>
                <I18N textKey="lesson-submit-button" lang={I18NLangs.RU}></I18N>    
            </Button>}
            {status === ChallengeStatus.CORRECT && <Alert severity="success">
                <I18N textKey="lesson-submit-correct-message" lang={I18NLangs.RU}></I18N>
            </Alert>}
            {status === ChallengeStatus.INCORRECT && <Alert severity="error">
                <Typography variant="body1">
                    <I18N textKey="lesson-submit-error-message" lang={I18NLangs.RU}></I18N>{expectedAnswer}
                </Typography>
            </Alert>}
        </>
    );
};