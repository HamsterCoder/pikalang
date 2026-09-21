import { Timer, X as CloseIcon } from 'lucide-react';
import { styled } from 'styled-components';

import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { IconButton } from '@components/ui/IconButton';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Tooltip } from '@components/ui/Tooltip';
import { LessonRow } from '@components/LessonView/LessonView.styles';
import { formatDuration } from '@utils/formatDuration';

import { StarTally } from './StarTally';

export interface WordLessonTopBarProps {
    /** Share of the set worked through, 0 to 100. */
    progress: number;
    /** Stars in hand so far. */
    stars: number;
    /** The most this set is worth. */
    maxStars: number;
    /**
     * The stopwatch reading, in ms, shown only while the matching round runs.
     * The clock never punishes — it is there to be beaten next time.
     */
    elapsedMs?: number;
    onExit(): void;
}

const Bar = styled.header`
    position: sticky;
    top: 0;
    z-index: 5;

    padding: 0.75rem 0;
    border-bottom: 1px solid ${({ theme }) => theme.color.border};

    background-color: ${({ theme }) => theme.color.surface};
`;

const Track = styled(ProgressBar)`
    flex: 1 1 auto;
    border-radius: ${({ theme }) => theme.radius.pill};
`;

const Clock = styled.span`
    display: inline-flex;
    align-items: center;
    gap: 0.3rem;
    flex-shrink: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    color: ${({ theme }) => theme.color.hint};
`;

/**
 * The word lesson's chrome: the way out, how far along the set is, the stars
 * in hand and, once the matching starts, the clock.
 */
export const WordLessonTopBar = ({
    progress,
    stars,
    maxStars,
    elapsedMs,
    onExit,
}: WordLessonTopBarProps) => {
    return (
        <Bar>
            <LessonRow>
                <Tooltip
                    title={
                        <I18N textKey="word-exit-button" lang={I18NLangs.RU} />
                    }
                    side="bottom"
                >
                    <IconButton
                        tone="default"
                        aria-label={translate(I18NLangs.RU, 'word-exit-button')}
                        onClick={onExit}
                    >
                        <CloseIcon aria-hidden />
                    </IconButton>
                </Tooltip>

                <Track
                    tone="muted"
                    value={progress}
                    aria-label={translate(I18NLangs.RU, 'word-progress-label')}
                />

                {typeof elapsedMs === 'number' && (
                    <Clock
                        aria-label={translate(I18NLangs.RU, 'word-time-label')}
                    >
                        <Timer size={15} aria-hidden="true" />
                        {formatDuration(elapsedMs)}
                    </Clock>
                )}

                <StarTally earned={stars} total={maxStars} />
            </LessonRow>
        </Bar>
    );
};
