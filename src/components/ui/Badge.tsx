import { ReactNode } from 'react';
import { styled, css } from 'styled-components';

export type BadgeTone = 'accent' | 'success' | 'muted' | 'trophy' | 'inverted';

export interface BadgeProps {
    tone?: BadgeTone;
    /** A small icon rendered before the label, usually a `lucide-react` icon. */
    icon?: ReactNode;
    children: ReactNode;
    className?: string;
}

const tones: Record<BadgeTone, ReturnType<typeof css>> = {
    accent: css`
        color: ${({ theme }) => theme.color.accent};
        background-color: ${({ theme }) => theme.color.accentSoft};
        border-color: transparent;
    `,
    success: css`
        color: ${({ theme }) => theme.color.successText};
        background-color: ${({ theme }) => theme.color.successSurface};
        border-color: ${({ theme }) => theme.color.successBorder};
    `,
    muted: css`
        color: ${({ theme }) => theme.color.hint};
        background-color: ${({ theme }) => theme.color.surfaceMuted};
        border-color: transparent;
    `,
    trophy: css`
        color: ${({ theme }) => theme.color.trophy};
        background-color: ${({ theme }) => theme.color.trophySurface};
        border-color: ${({ theme }) => theme.color.trophyBorder};
    `,
    /** For badges sitting on an accent-coloured surface, such as the unit banner. */
    inverted: css`
        color: ${({ theme }) => theme.color.textInverted};
        background-color: rgba(255, 255, 255, 0.2);
        border-color: rgba(255, 255, 255, 0.35);
    `,
};

const StyledBadge = styled.span<{ $tone: BadgeTone }>`
    display: inline-flex;
    align-items: center;
    gap: 0.25rem;

    padding: 1px 0.6rem;
    border: 1px solid transparent;
    border-radius: ${({ theme }) => theme.radius.pill};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: 500;
    line-height: ${({ theme }) => theme.text.chip.lineHeight};
    white-space: nowrap;

    ${({ $tone }) => tones[$tone]}
`;

/** A small status pill: lesson state, rewards, section labels. */
export const Badge = ({
    tone = 'muted',
    icon,
    children,
    className,
}: BadgeProps) => {
    return (
        <StyledBadge className={className} $tone={tone}>
            {icon}
            {children}
        </StyledBadge>
    );
};
