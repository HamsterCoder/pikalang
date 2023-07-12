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
    answer: string;
    chips: string[];
}

export interface QuestionToChipsProps {
    type: ChallengeType.QUESTION_TO_CHIPS;
    data: QuestionToChipsData;
}

export const QuestionToChips: FunctionComponent<QuestionToChipsProps> = ({ data }) => {
    const [candidateChips, setCandidateChips] = useState<string[]>(data.chips);
    const [answerChips, setAnswerChips] = useState<string[]>([]);
    const [status, setStatus] = useState<ChallengeStatus>(ChallengeStatus.PROGRESS);

    function onChipSelect(chip: string) {
        // console.log(chip);
    
        setCandidateChips(candidateChips.filter(currentChip => currentChip !== chip));
        setAnswerChips(answerChips.concat([chip]));
    }
    
    function onChipDeselect(chip: string) {
        // console.log(chip);
    
        setCandidateChips(candidateChips.concat([chip]));
        setAnswerChips(answerChips.filter(currentChip => currentChip !== chip));
    }

    function onSubmit() {
        if (answerChips.join(' ') === data.answer) {
            setStatus(ChallengeStatus.CORRECT);
        } else {
            setStatus(ChallengeStatus.INCORRECT);
        }

        console.log(`Answer is ${answerChips.join(' ') === data.answer ? 'correct' : 'incorrect'}`);
    }

    // TODO Move image to a separate component
    // TODO Move submit to a separage component

    return (
        <div>
            <Typography variant="h4" gutterBottom>Answer the question</Typography>

            {data.image && <Paper elevation={0} variant="outlined" className="picture">
                <img className="picture-content" src={`assets/${data.image}.jpg`}/>
            </Paper>}

            <Typography variant="h4">{data.question}</Typography>

            <CandidateChips chips={answerChips} onSelect={onChipDeselect}/>

            <CandidateChips chips={candidateChips} onSelect={onChipSelect}/>

            <div>
                {status === ChallengeStatus.PROGRESS && <Button color="success" variant="contained" onClick={onSubmit}>Check</Button>}
                {status === ChallengeStatus.CORRECT && <Alert severity="success">The answer is correct</Alert>}
                {status === ChallengeStatus.INCORRECT && <Alert severity="error">The answer is incorrect. Expexted answer: {data.answer}</Alert>}
            </div>
        </div>
    );
};
