import { styled } from 'styled-components';
import { Progress } from 'radix-ui';

export interface ProgressBarProps {
    /** Completion in percent, 0 to 100. */
    value: number;
    className?: string;
    'aria-label'?: string;
}

const Track = styled(Progress.Root)`
    position: relative;
    overflow: hidden;

    width: 100%;
    height: 0.5rem;

    background-color: ${({ theme }) => theme.color.accentTrack};
`;

const Indicator = styled(Progress.Indicator)`
    width: 100%;
    height: 100%;

    background-color: ${({ theme }) => theme.color.accent};
    transition: transform 0.4s linear;
`;

export const ProgressBar = ({
    value,
    className,
    'aria-label': ariaLabel,
}: ProgressBarProps) => {
    const clamped = Math.min(100, Math.max(0, value));

    return (
        <Track className={className} value={clamped} aria-label={ariaLabel}>
            <Indicator
                style={{ transform: `translateX(-${100 - clamped}%)` }}
            />
        </Track>
    );
};
