import { styled } from 'styled-components';
import { Progress } from 'radix-ui';

export type ProgressBarTone = 'accent' | 'inverted';

export interface ProgressBarProps {
    /** Completion in percent, 0 to 100. */
    value: number;
    /** `inverted` reads on an accent-coloured surface, such as the header. */
    tone?: ProgressBarTone;
    className?: string;
    'aria-label'?: string;
}

const Track = styled(Progress.Root)<{ $tone: ProgressBarTone }>`
    position: relative;
    overflow: hidden;

    width: 100%;
    height: 0.5rem;

    background-color: ${({ theme, $tone }) =>
        $tone === 'inverted'
            ? 'rgba(255, 255, 255, 0.35)'
            : theme.color.accentTrack};
`;

const Indicator = styled(Progress.Indicator)<{ $tone: ProgressBarTone }>`
    width: 100%;
    height: 100%;

    background-color: ${({ theme, $tone }) =>
        $tone === 'inverted' ? theme.color.textInverted : theme.color.accent};
    transition: transform 0.4s linear;
`;

export const ProgressBar = ({
    value,
    tone = 'accent',
    className,
    'aria-label': ariaLabel,
}: ProgressBarProps) => {
    const clamped = Math.min(100, Math.max(0, value));

    return (
        <Track
            className={className}
            value={clamped}
            aria-label={ariaLabel}
            $tone={tone}
        >
            <Indicator
                $tone={tone}
                style={{ transform: `translateX(-${100 - clamped}%)` }}
            />
        </Track>
    );
};
