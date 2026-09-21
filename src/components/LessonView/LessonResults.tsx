import { CircleCheck, GraduationCap, Zap } from 'lucide-react';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { ResultsPanel } from '@components/Results/ResultsPanel';
import { StarTally } from '@components/WordLesson/StarTally';

export interface LessonResultsProps {
    /** Challenges answered correctly, which is also the XP the run is worth. */
    correct: number;
    /** Challenges answered at all: a lesson left early has fewer than `total`. */
    answered: number;
    /** How many challenges the lesson put up. */
    total: number;
    className?: string;
}

/**
 * What the lesson was worth. A star for every challenge answered correctly,
 * counted against the whole lesson rather than against what was attempted, so
 * leaving early shows as the shortfall it is.
 */
export const LessonResults = ({
    correct,
    answered,
    total,
    className,
}: LessonResultsProps) => {
    return (
        <ResultsPanel
            className={className}
            title={
                <I18N textKey="lesson-complete-appraisal" lang={I18NLangs.RU} />
            }
            highlight={
                <StarTally earned={correct} total={total} size="large" />
            }
            rows={[
                {
                    id: 'answered',
                    icon: <GraduationCap size={16} aria-hidden="true" />,
                    label: (
                        <I18N
                            textKey="lesson-result-answered"
                            lang={I18NLangs.RU}
                        />
                    ),
                    value: `${answered} / ${total}`,
                },
                {
                    id: 'correct',
                    icon: <CircleCheck size={16} aria-hidden="true" />,
                    label: (
                        <I18N
                            textKey="lesson-result-correct"
                            lang={I18NLangs.RU}
                        />
                    ),
                    value: `${correct} / ${answered}`,
                },
                {
                    id: 'xp',
                    icon: <Zap size={16} aria-hidden="true" />,
                    label: <I18N textKey="xp-label" lang={I18NLangs.RU} />,
                    value: `+${correct}`,
                },
            ]}
        />
    );
};
