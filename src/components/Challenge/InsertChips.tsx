import { Chip, Typography } from "@mui/material";
import { FunctionComponent, useState, useCallback, ReactNode } from "react";

import { ChallengeType } from "./types";
import { CheckAnswerControl } from "../CheckAnswerControl/CheckAnswerControl";
import { I18N, I18NLangs } from "../I18N/I18N";
import { Chips } from "../Chips/Chips";
import { styled } from "styled-components";
import { shuffle } from "../../utils/shuffle";

// TODO simplify this format, get all data from sentence
export interface InsertChipsData {
    sentence: string;
    answer: string;
    translation: string;
    chips: string[];
}

export interface TranslateChipsProps {
    type: ChallengeType.INSERT_CHIPS;
    data: InsertChipsData;
    onComplete({solved}: {solved: boolean}): void;
}

interface WordInsertProps {
    len: number;
}

const WordInsert = styled.span<WordInsertProps>`
    display: inline-block;
    min-width: ${props => props.len - 2}rem;
    border-bottom: 2px solid var(--primary-accent);
`;

export const InsertChips: FunctionComponent<TranslateChipsProps> = ({ data, onComplete }) => {
    const [fromChips, setFromChips] = useState<string[]>(shuffle(data.chips.slice()));
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips} and chips: ${data.chips}`);

        return data.chips.every((chip, index) => chip === answerChips[index]);
    }, [data, answerChips]);
    
    function onChipSelect(chip: string, index: number) {
        // console.log(chip, index);

        // Find the first empty slot
        let insertIndex = answerChips.indexOf('');

        setAnswerChips(insertIndex !== -1 ?  
            [
                ...answerChips.slice(0, insertIndex),
                chip,
                ...answerChips.slice(insertIndex + 1)
            ]
            : [...answerChips, chip]);

        setFromChips([
            ...fromChips.slice(0, index),
            ...fromChips.slice(index + 1)
        ]);
    }

    function onChipDeselect(chip: string, index: number) {
        // console.log(chip, index);

        setFromChips([...fromChips, chip]);

        // Leave an empty slot
        setAnswerChips([
            ...answerChips.slice(0, index),
            '',
            ...answerChips.slice(index + 1)
        ]);
    }

    function prepareSentence(sentence: string, answerChips: string[]): ReactNode[] {
        let insertCounter = 0;
        
        return sentence.split(' ').map(word => {
            if (word[0] === '{' && word[word.length - 1] === '}') {
                const chip = answerChips[insertCounter] && <Chip sx={{ marginBottom: '5px'}} variant="outlined" onClick={onChipDeselect.bind(null, answerChips[insertCounter], insertCounter)} color="primary" label={answerChips[insertCounter]} />;
                insertCounter += 1;
                return (<><WordInsert len={word.length}>{chip}</WordInsert> </>);
            }
            return word + ' ';
        });
    }

    const expectedAnswer = data.answer;

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>
                <I18N textKey="insert-chips-prompt" lang={I18NLangs.RU}/>
            </Typography>

            <Typography variant="h5" mb={2}>{prepareSentence(data.sentence, answerChips)}</Typography>

            <Chips chips={fromChips} onSelect={onChipSelect}/>

            <CheckAnswerControl onSubmit={onComplete} checkAnswer={checkAnswer} expectedAnswer={expectedAnswer} translation={data.translation} />
        </div>
    );
};
