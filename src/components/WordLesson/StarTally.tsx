import { Star } from 'lucide-react';
import { styled } from 'styled-components';

export interface StarTallyProps {
    /** Stars earned so far. */
    earned: number;
    /** The most this run could be worth. Omit to show the count on its own. */
    total?: number;
    size?: 'small' | 'large';
    className?: string;
}

const Tally = styled.span<{ $size: 'small' | 'large' }>`
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;

    padding: ${({ $size }) =>
        $size === 'large' ? '0.4rem 0.9rem' : '0.2rem 0.6rem'};
    border: 1px solid ${({ theme }) => theme.color.trophyBorder};
    border-radius: ${({ theme }) => theme.radius.pill};

    background-color: ${({ theme }) => theme.color.trophySurface};
    color: ${({ theme }) => theme.color.trophy};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme, $size }) =>
        $size === 'large'
            ? theme.text.heading_s.size
            : theme.text.controlSmall.size};
    font-weight: 500;
    font-variant-numeric: tabular-nums;
    white-space: nowrap;
`;

const Total = styled.span`
    opacity: 0.7;
`;

/** The running count of stars, in the top bar and again on the result screen. */
export const StarTally = ({
    earned,
    total,
    size = 'small',
    className,
}: StarTallyProps) => {
    return (
        <Tally className={className} $size={size}>
            <Star
                size={size === 'large' ? 20 : 15}
                fill="currentColor"
                aria-hidden="true"
            />
            {earned}
            {typeof total === 'number' && <Total>/ {total}</Total>}
        </Tally>
    );
};
