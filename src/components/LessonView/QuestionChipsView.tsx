import { styled } from 'styled-components';

import { HintTooltip } from '@components/HintTooltip';
import { PictureImage } from '@components/Picture/PictureImage';

import { ChipsAnswer } from './ChipsAnswer';
import { SubjectCard } from './SubjectCard';

import type { QuestionChipsData } from '@lessons/types';
import type { ChallengeViewProps } from './types';

const Illustration = styled.div`
    overflow: hidden;

    width: 10rem;
    height: 10rem;
    border-radius: ${({ theme }) => theme.radius.m};
`;

export const QuestionChipsView = ({
    data,
    answer,
    locked,
    onAnswerChange,
}: ChallengeViewProps<QuestionChipsData>) => {
    return (
        <>
            <SubjectCard
                illustration={
                    data.image && (
                        <Illustration>
                            <PictureImage image={data.image} />
                        </Illustration>
                    )
                }
            >
                {data.question}
                <HintTooltip text={data.questionHint} />
            </SubjectCard>
            <ChipsAnswer
                chips={data.chips}
                answer={answer}
                expected={data.answer[0]}
                locked={locked}
                onAnswerChange={onAnswerChange}
            />
        </>
    );
};
