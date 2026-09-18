import { ReactNode } from 'react';
import { styled, css } from 'styled-components';

export type StatPillTone = 'default' | 'accent' | 'trophy';

export interface StatPillProps {
    /** A small icon rendered before the value, usually a `lucide-react` icon. */
    icon?: ReactNode;
    children: ReactNode;
    tone?: StatPillTone;
    /** Names the value for assistive tech, e.g. "Опыт". */
    'aria-label'?: string;
    className?: string;
}

const tones: Record<StatPillTone, ReturnType<typeof css>> = {
    default: css`
        color: ${({ theme }) => theme.color.text};
    `,
    accent: css`
        color: ${({ theme }) => theme.color.accent};
    `,
    trophy: css`
        color: ${({ theme }) => theme.color.trophy};
    `,
};

const StyledPill = styled.span<{ $tone: StatPillTone }>`
    display: inline-flex;
    align-items: center;
    gap: 0.4rem;

    padding: 0.3rem 0.75rem;
    border: 1px solid ${({ theme }) => theme.color.border};
    border-radius: ${({ theme }) => theme.radius.pill};

    background-color: ${({ theme }) => theme.color.surface};
    box-shadow: ${({ theme }) => theme.shadow.subtle};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.control.size};
    font-weight: 500;
    line-height: 1.5;
    white-space: nowrap;

    ${({ $tone }) => tones[$tone]}
`;

/**
 * A bordered counter pill for the header: experience, streaks, the active
 * course. Read-only — use `Button` when the value is something to click.
 */
export const StatPill = ({
    icon,
    children,
    tone = 'default',
    'aria-label': ariaLabel,
    className,
}: StatPillProps) => {
    return (
        <StyledPill className={className} $tone={tone} aria-label={ariaLabel}>
            {icon}
            {children}
        </StyledPill>
    );
};
