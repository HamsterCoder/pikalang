// Have render and check logic here
// Make challenge a wrapper - submit should be rendered by challenge

import { IconButton, Tooltip, Typography } from '@mui/material';
import { FunctionComponent, useCallback, useMemo, useState } from 'react';
import { styled } from 'styled-components';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { ChallengeType } from './types';
import { ChipsAndLines } from '@components/Chips/ChipsAndLines';
import { Picture } from '@components/Picture/Picture';
import { CheckAnswerControl } from '@components/CheckAnswerControl/CheckAnswerControl';
import { I18N, I18NLangs } from '@components/I18N/I18N';

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
    const [answerChips, setAnswerChips] = useState<string[]>([]);

    const checkAnswer = useCallback(() => {
        console.log(`Answer chips: ${answerChips}`, answerChips);

        return data.answer.some(
            (possibleAnswer) => possibleAnswer === answerChips.join(' '),
        );
    }, [data, answerChips]);

    const expectedAnswer = data.answer[0];
    const anotherAnswer = useMemo(() => {
        const answerIndex = data.answer.findIndex(
            (possibleAnswer) => possibleAnswer === answerChips.join(' '),
        );

        if (answerIndex !== -1) {
            if (data.answer.length === 1) {
                return;
            }

            if (answerIndex !== data.answer.length - 1) {
                return data.answer[answerIndex + 1];
            } else {
                return data.answer[0];
            }
        }

        return;
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
                <Tooltip title={data.questionHint} arrow>
                    <IconButton aria-label="hint">
                        <HelpOutlineIcon color="primary" />
                    </IconButton>
                </Tooltip>
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
