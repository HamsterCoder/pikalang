import { Typography } from "@mui/material";
import { FunctionComponent, useState, useCallback } from "react";

// TODO get rid of relative import for components
import {ChallengeType} from "./Challenge";
import { ChipsAndLines } from "../Chips/ChipsAndLines";
import { CheckAnswerControl } from "../CheckAnswerControl/CheckAnswerControl";

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

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips}`, answerChips);

        return data.answer.some(possibleAnswer => possibleAnswer === answerChips.join(' '));
    }, [data, answerChips]);

    const expectedAnswer = data.answer[0];

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>Translate this sentence</Typography>

            <Typography variant="h5" mb={2}>{data.sentence}</Typography>

            <ChipsAndLines chips={data.chips} onChange={setAnswerChips}/>

            <CheckAnswerControl onSubmit={onComplete} checkAnswer={checkAnswer} expectedAnswer={expectedAnswer} />
        </div>
    );
};
