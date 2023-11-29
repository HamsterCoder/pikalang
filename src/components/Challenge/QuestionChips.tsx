// TODO Have render and check logic here
// TODO Make challenge a wrapper - submit should be rendered by challenge

import { Typography } from '@mui/material';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { ChallengeType } from './types';
import { ChipsAndLines } from '@components/Chips/ChipsAndLines';
import { Picture } from '@components/Picture/Picture';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { I18N, I18NLangs } from '@components/I18N/I18N';
import { isCorrectAnswer, prepareAnotherAnswer } from './utils';
import { HintTooltip } from '@components/HintTooltip';

export interface QuestionChipsData {
    image?: string;
    question: string;
    questionHint: string;
    answer: string[];
    chips: string[];
}

export interface QuestionChipsChallenge {
    type: ChallengeType.QUESTION_CHIPS;
    data: QuestionChipsData;
}

export interface QuestionChipsProps {
    challenge: {
        type: ChallengeType.QUESTION_CHIPS;
        data: QuestionChipsData;
    };
    onComplete({ solved }: { solved: boolean }): void;
}

const PictureContainer = styled.div`
    margin-bottom: 20px;
`;

export const QuestionChips: FunctionComponent<QuestionChipsProps> = ({
    challenge: { data },
    onComplete,
}) => {
    const [complete, setComplete] = useState(false);
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const checkAnswer = useCallback(() => {
        console.log(`LOG::Answer chips: ${answerChips}`, answerChips);

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
                <I18N textKey="question-chips-prompt" lang={I18NLangs.RU} />
            </Typography>

            {data.image && (
                <PictureContainer>
                    <Picture image={data.image} />
                </PictureContainer>
            )}

            <Typography variant="h5" mb={2}>
                {data.question}
                <HintTooltip text={data.questionHint} />
            </Typography>

            <ChipsAndLines
                nonInteractive={complete}
                chips={data.chips}
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
