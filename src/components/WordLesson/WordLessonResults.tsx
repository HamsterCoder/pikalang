import { BookOpen, Timer, Shuffle } from 'lucide-react';

import { I18N } from '@components/I18N/I18N';
import { I18NLangs } from '@components/I18N/types';
import { ResultsPanel } from '@components/Results/ResultsPanel';
import { formatDuration } from '@utils/formatDuration';

import { StarTally } from './StarTally';

export interface WordLessonResultsProps {
    /** New words read rather than skipped, a star each. */
    learnedStars: number;
    /** Pairs matched without a wrong guess first, a star each. */
    matchStars: number;
    /** How many words the set held. */
    wordCount: number;
    /** How long the matching round took, in ms. */
    timeMs: number;
    className?: string;
}

/**
 * What the set was worth: a star for every new word read and every pair
 * matched first time, and the clock the learner has to beat next round.
 */
export const WordLessonResults = ({
    learnedStars,
    matchStars,
    wordCount,
    timeMs,
    className,
}: WordLessonResultsProps) => {
    return (
        <ResultsPanel
            className={className}
            title={
                <I18N textKey="word-complete-appraisal" lang={I18NLangs.RU} />
            }
            highlight={
                <StarTally
                    earned={learnedStars + matchStars}
                    total={wordCount * 2}
                    size="large"
                />
            }
            rows={[
                {
                    id: 'learned',
                    icon: <BookOpen size={16} aria-hidden="true" />,
                    label: (
                        <I18N
                            textKey="word-result-learned"
                            lang={I18NLangs.RU}
                        />
                    ),
                    value: `${learnedStars} / ${wordCount}`,
                },
                {
                    id: 'matched',
                    icon: <Shuffle size={16} aria-hidden="true" />,
                    label: (
                        <I18N
                            textKey="word-result-matched"
                            lang={I18NLangs.RU}
                        />
                    ),
                    value: `${matchStars} / ${wordCount}`,
                },
                {
                    id: 'time',
                    icon: <Timer size={16} aria-hidden="true" />,
                    label: (
                        <I18N textKey="word-result-time" lang={I18NLangs.RU} />
                    ),
                    value: formatDuration(timeMs),
                },
            ]}
        />
    );
};
