import { Typography } from "@mui/material";
import { FunctionComponent, useState, useCallback } from "react";

import { ChallengeType } from "./types";
import { ChipsAndLines } from "../Chips/ChipsAndLines";
import { CheckAnswerControl } from "../CheckAnswerControl/CheckAnswerControl";
import { I18N, I18NLangs } from "../I18N/I18N";

export interface TranslateChipsData {
    sentence: string;
    answer: string[];
    chips: string[];
}

export interface TranslateChipsProps {
    type: ChallengeType.TRANSLATE_CHIPS;
    data: TranslateChipsData;
    onComplete({solved}: {solved: boolean}): void;
}

export const TranslateChips: FunctionComponent<TranslateChipsProps> = ({ data, onComplete }) => {
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips}`, answerChips);

        return data.answer.some(possibleAnswer => possibleAnswer.toLowerCase() === answerChips.join(' ').toLowerCase());
    }, [data, answerChips]);

    const expectedAnswer = data.answer[0];

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>
                <I18N textKey="translate-chips-prompt" lang={I18NLangs.RU}/>
            </Typography>

            <Typography variant="h5" mb={2}>{data.sentence}</Typography>

            <ChipsAndLines chips={data.chips} onChange={setAnswerChips}/>

            <CheckAnswerControl onSubmit={onComplete} checkAnswer={checkAnswer} expectedAnswer={expectedAnswer} />
        </div>
    );
};
