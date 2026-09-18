import { ReactNode } from 'react';
import { styled } from 'styled-components';

export type SegmentedProgressTone = 'accent' | 'success' | 'muted';

export interface SegmentedProgressProps {
    /** How many segments to draw, one per attempt needed to finish a lesson. */
    total: number;
    /** How many of them are filled. */
    completed: number;
    tone?: SegmentedProgressTone;
    /** Optional caption after the segments, such as `2/4 подхода`. */
    label?: ReactNode;
    className?: string;
    'aria-label'?: string;
}

const Container = styled.div`
    display: flex;
    align-items: center;
    gap: 0.5rem;
`;

const Segments = styled.div`
    display: flex;
    flex: 1 1 auto;
    gap: 0.4rem;
    min-width: 0;
`;

const Segment = styled.span<{ $tone: SegmentedProgressTone; $filled: boolean }>`
    flex: 1 1 0;

    height: 0.5rem;
    border-radius: ${({ theme }) => theme.radius.pill};

    background-color: ${({ theme, $tone, $filled }) => {
        if (!$filled) {
            return theme.color.surfaceMuted;
        }

        return $tone === 'success' ? theme.color.success : theme.color.accent;
    }};
    transition: background-color ${({ theme }) => theme.transition.medium};
`;

const Label = styled.span<{ $tone: SegmentedProgressTone }>`
    flex-shrink: 0;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: 500;
    color: ${({ theme, $tone }) => {
        if ($tone === 'success') {
            return theme.color.successText;
        }

        return $tone === 'muted' ? theme.color.hint : theme.color.accent;
    }};
`;

/**
 * A progress bar split into discrete steps, for progress that is counted in
 * whole attempts rather than measured as a percentage.
 */
export const SegmentedProgress = ({
    total,
    completed,
    tone = 'accent',
    label,
    className,
    'aria-label': ariaLabel,
}: SegmentedProgressProps) => {
    const clamped = Math.min(Math.max(completed, 0), total);

    return (
        <Container className={className}>
            <Segments
                role="progressbar"
                aria-label={ariaLabel}
                aria-valuemin={0}
                aria-valuemax={total}
                aria-valuenow={clamped}
            >
                {Array.from({ length: total }, (_, index) => (
                    <Segment
                        key={index}
                        $tone={tone}
                        $filled={index < clamped}
                    />
                ))}
            </Segments>
            {label && <Label $tone={tone}>{label}</Label>}
        </Container>
    );
};
