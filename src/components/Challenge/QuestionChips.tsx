// Have render and check logic here
// Make challenge a wrapper - submit should be rendered by challenge


import { Typography, Button, Alert } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { styled } from "styled-components";

// TODO get rid of relative import for components
import { ChipsAndLines } from "../Chips/ChipsAndLines";
import { ChallengeType, ChallengeStatus } from "./Challenge";
import { Picture } from "../Picture/Picture";

export interface QuestionChipsData {
    image?: string;
    question: string;
    answer: string[];
    chips: string[];
}

export interface QuestionChipsProps {
    type: ChallengeType.QUESTION_CHIPS;
    data: QuestionChipsData;
    onComplete({solved}: {solved: boolean}): void;
}

const PictureContainer = styled.div`
    margin-bottom: 20px;
`;

// TODO how do you reset status? Maybe by showing a loader or by interseption props change?

export const QuestionChips: FunctionComponent<QuestionChipsProps> = ({ data, onComplete }) => {
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

        console.log(`Answer chips ${answerChips}`);
    }

    // TODO Move submit to a separage component

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Answer the question</Typography>
            
            {data.image && <PictureContainer><Picture image={data.image}/></PictureContainer>}

            <Typography variant="h5" mb={2}>{data.question}</Typography>

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
