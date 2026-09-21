import { css } from 'styled-components';

export type ButtonVariant = 'filled' | 'text';
export type ButtonTone = 'accent' | 'success';
export type ButtonSize = 'medium' | 'small';

export interface ButtonStyleProps {
    $variant: ButtonVariant;
    $tone: ButtonTone;
    $size: ButtonSize;
}

const filled = css<ButtonStyleProps>`
    color: ${({ theme, $tone }) =>
        $tone === 'success' ? theme.color.contrastText : theme.color.surface};
    background-color: ${({ theme, $tone }) =>
        $tone === 'success' ? theme.color.success : theme.color.accent};
    box-shadow: ${({ theme }) => theme.shadow.raised};

    &:hover:not(:disabled) {
        background-color: ${({ theme, $tone }) =>
            $tone === 'success'
                ? theme.color.successHover
                : theme.color.heading};
    }
`;

const text = css<ButtonStyleProps>`
    color: ${({ theme, $tone }) =>
        $tone === 'success' ? theme.color.successText : theme.color.accent};
    background-color: transparent;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.color.accentWash};
    }
`;

/**
 * The shared look of `Button` and `ButtonLink`. Kept here rather than in the
 * component so a `<button>` and an `<a>` can render identically.
 */
export const buttonStyles = css<ButtonStyleProps>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    min-width: 64px;
    padding: ${({ $size }) => ($size === 'small' ? '4px 5px' : '6px 16px')};
    border: none;
    border-radius: ${({ theme }) => theme.radius.xl};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme, $size }) =>
        $size === 'small'
            ? theme.text.controlSmall.size
            : theme.text.control.size};
    font-weight: ${({ theme }) => theme.text.control.weight};
    line-height: ${({ theme }) => theme.text.control.lineHeight};
    text-transform: uppercase;
    text-decoration: none;

    cursor: pointer;
    transition:
        background-color ${({ theme }) => theme.transition.fast},
        box-shadow ${({ theme }) => theme.transition.fast};

    ${({ $variant }) => ($variant === 'filled' ? filled : text)}

    &:disabled {
        color: ${({ theme }) => theme.color.disabledText};
        background-color: ${({ theme, $variant }) =>
            $variant === 'filled'
                ? theme.color.disabledSurface
                : 'transparent'};
        box-shadow: none;
        cursor: default;
    }
`;
