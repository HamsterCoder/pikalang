import { ButtonHTMLAttributes, ReactNode } from 'react';
import { css, styled } from 'styled-components';

/**
 * - `outline`: a word offered to the learner, the original look.
 * - `bank`: a tile in the word bank, which keeps its place in the grid and
 *   greys out once the word has been used.
 * - `solid`: a word the learner has placed into their answer.
 */
export type ChipVariant = 'outline' | 'bank' | 'solid';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
    variant?: ChipVariant;
    /** Rendered after the label, usually a small icon. */
    trailing?: ReactNode;
}

const variants: Record<ChipVariant, ReturnType<typeof css>> = {
    outline: css`
        height: 32px;
        padding: 0 11px;
        border: 1px solid ${({ theme }) => theme.color.accentBorder};
        border-radius: ${({ theme }) => theme.radius.pill};

        color: ${({ theme }) => theme.color.accent};
        background-color: transparent;

        &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.color.accentWash};
        }

        &:disabled {
            color: ${({ theme }) => theme.color.disabledText};
            border-color: ${({ theme }) => theme.color.disabledSurface};
        }
    `,
    bank: css`
        justify-content: center;

        width: 100%;
        height: 44px;
        padding: 0 0.75rem;
        border: 1px solid ${({ theme }) => theme.color.border};
        border-radius: ${({ theme }) => theme.radius.l};

        color: ${({ theme }) => theme.color.text};
        background-color: ${({ theme }) => theme.color.surface};
        box-shadow: ${({ theme }) => theme.shadow.subtle};

        font-weight: 500;

        &:hover:not(:disabled) {
            border-color: ${({ theme }) => theme.color.borderStrong};
            background-color: ${({ theme }) => theme.color.accentWash};
        }

        &:disabled {
            color: ${({ theme }) => theme.color.disabledText};
            border-style: dashed;
            background-color: ${({ theme }) => theme.color.surfaceMuted};
            box-shadow: none;
        }
    `,
    solid: css`
        gap: 0.35rem;

        height: 36px;
        padding: 0 0.75rem;
        border: 1px solid transparent;
        border-radius: ${({ theme }) => theme.radius.m};

        color: ${({ theme }) => theme.color.textInverted};
        background-color: ${({ theme }) => theme.color.accent};

        font-weight: 500;

        &:hover:not(:disabled) {
            background-color: ${({ theme }) => theme.color.heading};
        }

        &:disabled {
            opacity: 0.75;
        }
    `,
};

const StyledChip = styled.button<{ $variant: ChipVariant }>`
    display: inline-flex;
    align-items: center;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: ${({ theme }) => theme.text.chip.weight};
    line-height: ${({ theme }) => theme.text.chip.lineHeight};
    white-space: nowrap;

    cursor: pointer;
    transition:
        background-color ${({ theme }) => theme.transition.fast},
        border-color ${({ theme }) => theme.transition.fast};

    &:disabled {
        cursor: default;
    }

    ${({ $variant }) => variants[$variant]}
`;

export const Chip = ({
    label,
    variant = 'outline',
    trailing,
    type = 'button',
    ...rest
}: ChipProps) => {
    return (
        <StyledChip type={type} $variant={variant} {...rest}>
            {label}
            {trailing}
        </StyledChip>
    );
};
