import { Typography, Button, Alert } from "@mui/material";
import { FunctionComponent, useState } from "react";

// TODO get rid of relative import for components
import {ChallengeType, ChallengeStatus} from "./Challenge";
import { ChipsAndLines } from "../Chips/ChipsAndLines";

export interface QuestionChipsData {
    sentence: string;
    answer: string[];
    chips: string[];
}

export interface TranslateChipsProps {
    type: ChallengeType.TRANSLATE_CHIPS;
    data: QuestionChipsData;
    onComplete({solved}: {solved: boolean}): void;
}

export const TranslateChips: FunctionComponent<TranslateChipsProps> = ({ data, onComplete }) => {
    const [answerChips, setAnswerChips] = useState<string[]>([]);
    const [status, setStatus] = useState<ChallengeStatus>(ChallengeStatus.PROGRESS);

    function onSubmit() {
        if (data.answer.some(possibleAnswer => possibleAnswer === answerChips.join(' '))) {
            setStatus(ChallengeStatus.CORRECT);
            onComplete({ solved: true });
        } else {
            setStatus(ChallengeStatus.INCORRECT);
            onComplete({ solved: false });
        }

        console.log(`Answer chips: ${answerChips}`);
    }

    // TODO Move submit to a separage component

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Translate this sentence</Typography>

            <Typography variant="h5" mb={2}>{data.sentence}</Typography>

            <ChipsAndLines chips={data.chips} onChange={setAnswerChips}/>

            <div>
                {status === ChallengeStatus.PROGRESS && <Button color="success" variant="contained" sx={{ borderRadius: '8px' }} onClick={onSubmit}>Check</Button>}
                {status === ChallengeStatus.CORRECT && <Alert severity="success">The answer is correct</Alert>}
                {status === ChallengeStatus.INCORRECT && <Alert severity="error">
                    <Typography variant="body1">Incorrect. Expected answer: {data.answer[0]}</Typography>
                </Alert>}
            </div>
        </div>
    );
};
