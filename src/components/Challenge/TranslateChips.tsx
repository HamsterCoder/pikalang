import { Typography } from '@mui/material';
import { FunctionComponent, useState, useCallback, useMemo } from 'react';

import { ChallengeType } from './types';
import { ChipsAndLines } from '@components/Chips/ChipsAndLines';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { isCorrectAnswer, prepareAnotherAnswer } from './utils';
import { shuffle } from '@utils/shuffle';

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

function arrayCount(array: string[]): Record<string, number> {
    const count: Record<string, number> = {};

    for (const word of array) {
        count[word] = count[word] || 0;
        count[word] += 1;
    }

    return count;
}

function arrayUnion(first: string[], second: string[]): string[] {
    const firstCount = arrayCount(first);
    const secondCount = arrayCount(second);

    const count: Record<string, number> = {};

    for (const word of Object.keys(firstCount)) {
        count[word] = Math.max(firstCount[word], secondCount[word] ?? 0);
        delete firstCount[word];
        delete secondCount[word];
    }

    for (const word of Object.keys(secondCount)) {
        count[word] = secondCount[word];
    }

    let words: string[] = [];

    for (const word of Object.keys(count)) {
        const wordArray = new Array(count[word]);
        wordArray.fill(word);
        words = words.concat(wordArray);
    }

    return words;
}

export const TranslateChips: FunctionComponent<TranslateChipsProps> = ({
    challenge: { data },
    onComplete,
}) => {
    const [complete, setComplete] = useState(false);
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const chips = useMemo(() => {
        if ('wrongChips' in data) {
            let chips: string[] = [];

            data.answer.forEach((possibleAnswer) => {
                chips = arrayUnion(chips, possibleAnswer.split(' '));
            });

            chips = [...chips, ...data.wrongChips];

            return shuffle(chips);
        } else {
            return data.chips;
        }
    }, [data]);

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
            <Typography variant="h5" color="primary" gutterBottom>
                <I18N textKey="translate-chips-prompt" lang={I18NLangs.RU} />
            </Typography>

            <Typography variant="h5" mb={2}>
                {data.sentence}
            </Typography>

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
