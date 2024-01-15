import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';

import { ChallengeType } from './types';
import { ChipsAndLines } from '@components/Chips/ChipsAndLines';
import { Picture } from '@components/Picture/Picture';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { isCorrectAnswer, prepareAnotherAnswer } from './utils';
import { HintTooltip } from '@components/HintTooltip';
import { Heading } from '@components/Heading';
import Prompt from './Prompt';

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
    margin-bottom: 1rem;
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
            <Prompt textKey="question-chips-prompt" />

            {data.image && (
                <PictureContainer>
                    <Picture image={data.image} />
                </PictureContainer>
            )}

            <Heading size="m" color="default" sx={{ marginBottom: '1rem' }}>
                {data.question}
                <HintTooltip text={data.questionHint} />
            </Heading>

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
