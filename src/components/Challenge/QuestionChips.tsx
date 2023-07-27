// Have render and check logic here
// Make challenge a wrapper - submit should be rendered by challenge


import { Typography } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import { styled } from "styled-components";

// TODO get rid of relative import for components
import { ChipsAndLines } from "../Chips/ChipsAndLines";
import { ChallengeType } from "./Challenge";
import { Picture } from "../Picture/Picture";
import { CheckAnswerControl } from "../CheckAnswerControl/CheckAnswerControl";

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

export const QuestionChips: FunctionComponent<QuestionChipsProps> = ({ data, onComplete }) => {
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips}`, answerChips);

        return data.answer.some(possibleAnswer => possibleAnswer === answerChips.join(' '));
    }, [data, answerChips]);

    const expectedAnswer = data.answer[0];

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Answer the question</Typography>
            
            {data.image && <PictureContainer><Picture image={data.image}/></PictureContainer>}

            <Typography variant="h5" mb={2}>{data.question}</Typography>

            <ChipsAndLines chips={data.chips} onChange={setAnswerChips}/>

            <CheckAnswerControl onSubmit={onComplete} checkAnswer={checkAnswer} expectedAnswer={expectedAnswer} />
        </div>
    );
};
