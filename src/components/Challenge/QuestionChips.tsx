// Have render and check logic here
// Make challenge a wrapper - submit should be rendered by challenge


import { IconButton, Tooltip, Typography } from "@mui/material";
import { FunctionComponent, useCallback, useState } from "react";
import { styled } from "styled-components";
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// TODO get rid of relative import for components
import { ChipsAndLines } from "../Chips/ChipsAndLines";
import { ChallengeType } from "./types";
import { Picture } from "../Picture/Picture";
import { CheckAnswerControl } from "../CheckAnswerControl/CheckAnswerControl";
import { I18N, I18NLangs } from "../I18N/I18N";

export interface QuestionChipsData {
    image?: string;
    question: string;
    questionHint: string;
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
            <Typography variant="h5" color="primary" gutterBottom>
                <I18N textKey="question-chips-prompt" lang={I18NLangs.RU}/>
            </Typography>
            
            {data.image && <PictureContainer><Picture image={data.image}/></PictureContainer>}

            <Typography variant="h5" mb={2}>
                {data.question}
                <Tooltip title={data.questionHint} arrow>
                    <IconButton aria-label="hint">
                        <HelpOutlineIcon color="primary"/>
                    </IconButton>
                </Tooltip>
            </Typography>

            <ChipsAndLines chips={data.chips} onChange={setAnswerChips}/>

            <CheckAnswerControl onSubmit={onComplete} checkAnswer={checkAnswer} expectedAnswer={expectedAnswer} />
        </div>
    );
};
