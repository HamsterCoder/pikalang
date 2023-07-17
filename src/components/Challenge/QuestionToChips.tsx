// Have render and check logic here
// Make challenge a wrapper - submit should be rendered by challenge


import { Paper, Typography, Button, Alert } from "@mui/material";
import { FunctionComponent, useState } from "react";

// TODO get rid of relative import for components
import {CandidateChips} from "../CandidateChips/CandidateChips";
import {ChallengeType, ChallengeStatus} from "./Challenge";

import './QuestionToChips.css';

export interface QuestionToChipsData {
    image?: string;
    question: string;
    answer: string[];
    chips: string[];
}

export interface QuestionToChipsProps {
    type: ChallengeType.QUESTION_TO_CHIPS;
    data: QuestionToChipsData;
    onComplete({solved}: {solved: boolean}): void;
}

// TODO how do you reset status? Maybe by showing a loader or by interseption props change?

export const QuestionToChips: FunctionComponent<QuestionToChipsProps> = ({ data, onComplete }) => {
    const [candidateChips, setCandidateChips] = useState<string[]>(data.chips);
    const [answerChips, setAnswerChips] = useState<string[]>([]);
    const [status, setStatus] = useState<ChallengeStatus>(ChallengeStatus.PROGRESS);

    function onChipSelect(chip: string) {    
        setCandidateChips(candidateChips.filter(currentChip => currentChip !== chip));
        setAnswerChips(answerChips.concat([chip]));
    }
    
    function onChipDeselect(chip: string) {
        setCandidateChips(candidateChips.concat([chip]));
        setAnswerChips(answerChips.filter(currentChip => currentChip !== chip));
    }

    function onSubmit() {
        if (data.answer.some(possibleAnswer => possibleAnswer === answerChips.join(' '))) {
            setStatus(ChallengeStatus.CORRECT);
            onComplete({ solved: true });
        } else {
            setStatus(ChallengeStatus.INCORRECT);
            onComplete({ solved: false });
        }

        console.log(`Answer is ${data.answer.some(possibleAnswer => possibleAnswer === answerChips.join(' ')) ? 'correct' : 'incorrect'}`);
    }

    // TODO Move image to a separate component
    // TODO Move submit to a separage component

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Answer the question</Typography>

            {data.image && <Paper elevation={0} variant="outlined" className="picture">
                <img className="picture-content" src={`assets/${data.image}.jpg`}/>
            </Paper>}

            <Typography mb={2} variant="h5">{data.question}</Typography>

            <CandidateChips asAnswerField chips={answerChips} onSelect={onChipDeselect}/>

            <CandidateChips chips={candidateChips} onSelect={onChipSelect}/>

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
