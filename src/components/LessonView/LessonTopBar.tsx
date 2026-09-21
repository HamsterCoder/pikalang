import { X as CloseIcon } from 'lucide-react';
import { styled } from 'styled-components';

import { I18N } from '@components/I18N/I18N';
import { translate } from '@components/I18N/dictionary';
import { I18NLangs } from '@components/I18N/types';
import { IconButton } from '@components/ui/IconButton';
import { ProgressBar } from '@components/ui/ProgressBar';
import { Tooltip } from '@components/ui/Tooltip';

import { LessonRow } from './LessonView.styles';

export interface LessonTopBarProps {
    /** The challenge on screen, counting from one. */
    current: number;
    total: number;
    /**
     * Share of the lesson answered, 0 to 100. Not derived from `current`: a
     * challenge counts the moment it is answered, while the learner is still
     * looking at it.
     */
    progress: number;
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

const Counter = styled.span`
    flex-shrink: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.controlSmall.size};
    font-weight: 500;
    color: ${({ theme }) => theme.color.hint};
    font-variant-numeric: tabular-nums;
`;

/**
 * The way out, how far along the lesson is, and which challenge this is. The
 * bar spans the window; its controls sit in the lesson column, so they line up
 * with the challenge below.
 */
export const LessonTopBar = ({
    current,
    total,
    progress,
    onExit,
}: LessonTopBarProps) => {
    return (
        <Bar>
            <LessonRow>
                <Tooltip
                    title={
                        <I18N
                            textKey="lesson-exit-button"
                            lang={I18NLangs.RU}
                        />
                    }
                    side="bottom"
                >
                    <IconButton
                        tone="default"
                        aria-label={translate(
                            I18NLangs.RU,
                            'lesson-exit-button',
                        )}
                        onClick={onExit}
                    >
                        <CloseIcon aria-hidden />
                    </IconButton>
                </Tooltip>
                <Track
                    tone="muted"
                    value={progress}
                    aria-label={translate(
                        I18NLangs.RU,
                        'lesson-progress-label',
                    )}
                />
                <Counter>
                    {current} / {total}
                </Counter>
            </LessonRow>
        </Bar>
    );
};
