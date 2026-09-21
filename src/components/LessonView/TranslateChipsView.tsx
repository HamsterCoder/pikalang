import { useMemo } from 'react';

import { buildChips } from './answers';
import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';

import { ChipsAnswer } from './ChipsAnswer';
import { SubjectCard } from './SubjectCard';

import type { TranslateChipsData } from '@lessons/types';
import type { ChallengeViewProps } from './types';

export const TranslateChipsView = ({
    data,
    answer,
    locked,
    onAnswerChange,
}: ChallengeViewProps<TranslateChipsData>) => {
    const chips = useMemo(() => buildChips(data), [data]);

    return (
        <>
            <SubjectCard
                caption={
                    <I18N textKey="lesson-tap-words-hint" lang={I18NLangs.RU} />
                }
            >
                {data.sentence}
            </SubjectCard>
            <ChipsAnswer
                chips={chips}
                answer={answer}
                expected={data.answer[0]}
                locked={locked}
                onAnswerChange={onAnswerChange}
            />
        </>
    );
};
