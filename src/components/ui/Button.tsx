import { ButtonHTMLAttributes } from 'react';
import { styled, css } from 'styled-components';

export type ButtonVariant = 'filled' | 'text';
export type ButtonTone = 'accent' | 'success';
export type ButtonSize = 'medium' | 'small';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    tone?: ButtonTone;
    size?: ButtonSize;
}

const filled = css<{ $tone: ButtonTone }>`
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

const text = css<{ $tone: ButtonTone }>`
    color: ${({ theme, $tone }) =>
        $tone === 'success' ? theme.color.successText : theme.color.accent};
    background-color: transparent;

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.color.accentWash};
    }
`;

const StyledButton = styled.button<{
    $variant: ButtonVariant;
    $tone: ButtonTone;
    $size: ButtonSize;
}>`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;

    min-width: 64px;
    padding: ${({ $size }) => ($size === 'small' ? '4px 5px' : '6px 16px')};
    border: none;
    border-radius: ${({ theme }) => theme.radius.m};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme, $size }) =>
        $size === 'small'
            ? theme.text.controlSmall.size
            : theme.text.control.size};
    font-weight: ${({ theme }) => theme.text.control.weight};
    line-height: ${({ theme }) => theme.text.control.lineHeight};
    text-transform: uppercase;

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

export const Button = ({
    variant = 'filled',
    tone = 'accent',
    size = 'medium',
    type = 'button',
    ...rest
}: ButtonProps) => {
    return (
        <StyledButton
            type={type}
            $variant={variant}
            $tone={tone}
            $size={size}
            {...rest}
        />
    );
};
