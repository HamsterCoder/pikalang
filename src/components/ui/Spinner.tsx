import { styled, keyframes } from 'styled-components';

export interface SpinnerProps {
    className?: string;
    size?: number;
    label?: string;
}

const spin = keyframes`
    to {
        transform: rotate(360deg);
    }
`;

const Circle = styled.span<{ $size: number }>`
    display: inline-block;
    width: ${({ $size }) => $size}px;
    height: ${({ $size }) => $size}px;

    border: 3px solid ${({ theme }) => theme.color.accentTrack};
    border-top-color: ${({ theme }) => theme.color.accent};
    border-radius: ${({ theme }) => theme.radius.circle};

    animation: ${spin} 0.9s linear infinite;

    @media (prefers-reduced-motion: reduce) {
        animation-duration: 3s;
    }
`;

export const Spinner = ({ className, size = 40, label }: SpinnerProps) => {
    return (
        <Circle
            className={className}
            $size={size}
            role="progressbar"
            aria-label={label}
        />
    );
};
