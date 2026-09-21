import { useState, useCallback, useMemo } from 'react';

import { ChipsAndLines } from '@components/Chips/ChipsAndLines';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { Heading } from '@components/Heading';
import { buildChips, isCorrectAnswer, prepareAnotherAnswer } from './utils';
import { ChallengeType } from './types';
import Prompt from './Prompt';

export type TranslateChipsData =
    | {
          sentence: string;
          answer: string[];
          wrongChips: string[];
      }
    | {
          sentence: string;
          answer: string[];
          chips: string[];
      };

export interface TranslateChipsChallenge {
    type: ChallengeType.TRANSLATE_CHIPS;
    data: TranslateChipsData;
}

export interface TranslateChipsProps {
    challenge: TranslateChipsChallenge;
    onComplete({ solved }: { solved: boolean }): void;
}

export const TranslateChips = ({
    challenge: { data },
    onComplete,
}: TranslateChipsProps) => {
    const [complete, setComplete] = useState(false);
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const chips = useMemo(() => buildChips(data), [data]);

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips}`, answerChips);

        return isCorrectAnswer(data.answer, answerChips);
    }, [data, answerChips]);

    function handleChallengeComplete({ solved }: { solved: boolean }): void {
        setComplete(true);
        onComplete({ solved });
    }

    const expectedAnswer = data.answer[0];
    const anotherAnswer = useMemo(() => {
        return prepareAnotherAnswer(data.answer, answerChips);
    }, [data, answerChips]);

    return (
        <div>
            <Prompt textKey="translate-chips-prompt" />

            <Heading size="m" color="default" gutter>
                {data.sentence}
            </Heading>

            <ChipsAndLines
                nonInteractive={complete}
                chips={chips}
                onChange={setAnswerChips}
            />

            <CheckAnswerControl
                disabled={answerChips.length === 0}
                onSubmit={handleChallengeComplete}
                checkAnswer={checkAnswer}
                expectedAnswer={expectedAnswer}
                anotherAnswer={anotherAnswer}
            />
        </div>
    );
};
