import { Typography } from '@mui/material';
import { FunctionComponent, useState, useCallback, useMemo } from 'react';

import { ChallengeType } from './types';
import { ChipsAndLines } from '@components/Chips/ChipsAndLines';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { I18N, I18NLangs } from '@components/I18N/I18N';

export interface TranslateChipsData {
    sentence: string;
    answer: string[];
    chips: string[];
}

export interface TranslateChipsChallenge {
    type: ChallengeType.TRANSLATE_CHIPS;
    data: TranslateChipsData;
}

export interface TranslateChipsProps {
    challenge: TranslateChipsChallenge;
    onComplete({ solved }: { solved: boolean }): void;
}

export const TranslateChips: FunctionComponent<TranslateChipsProps> = ({
    challenge: { data },
    onComplete,
}) => {
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips}`, answerChips);

        return data.answer.some(
            (possibleAnswer) =>
                possibleAnswer.toLowerCase() ===
                answerChips.join(' ').toLowerCase(),
        );
    }, [data, answerChips]);

    const expectedAnswer = data.answer[0];
    const anotherAnswer = useMemo(() => {
        const answerIndex = data.answer.findIndex((possibleAnswer) => possibleAnswer === answerChips.join(' '));

        if (answerIndex !== -1) {
            if (data.answer.length === 1) {
                data.answer[0];
            }

            if (answerIndex !== data.answer.length - 1) {
                return data.answer[answerIndex + 1];
            } else {
                return data.answer[0];
            }
        }

        return data.answer[0];
    }, [data, answerChips]);

    return (
        <div>
            <Typography variant="h5" color="primary" gutterBottom>
                <I18N textKey="translate-chips-prompt" lang={I18NLangs.RU} />
            </Typography>

            <Typography variant="h5" mb={2}>
                {data.sentence}
            </Typography>

            <ChipsAndLines chips={data.chips} onChange={setAnswerChips} />

            <CheckAnswerControl
                onSubmit={onComplete}
                checkAnswer={checkAnswer}
                expectedAnswer={expectedAnswer}
                anotherAnswer={anotherAnswer}
            />
        </div>
    );
};
