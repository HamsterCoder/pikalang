import { ButtonHTMLAttributes, forwardRef } from 'react';
import { styled } from 'styled-components';

/**
 * `inverted` sits on an accent-coloured surface, `default` on a light one.
 */
export type IconButtonTone = 'inverted' | 'default';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    tone?: IconButtonTone;
}

const StyledIconButton = styled.button<{ $tone: IconButtonTone }>`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    border: none;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme, $tone }) =>
        $tone === 'default' ? theme.color.hint : 'inherit'};
    background-color: transparent;
    cursor: pointer;

    transition: background-color ${({ theme }) => theme.transition.fast};

    &:hover:not(:disabled) {
        color: ${({ theme, $tone }) =>
            $tone === 'default' ? theme.color.accent : 'inherit'};
        background-color: ${({ theme, $tone }) =>
            $tone === 'default'
                ? theme.color.accentWash
                : 'rgba(255, 255, 255, 0.15)'};
    }

    &:disabled {
        color: ${({ theme }) => theme.color.disabledText};
        cursor: default;
    }
`;

/**
 * Radix triggers pass a ref to whatever they render, so this forwards one even
 * though React 19 allows plain ref props.
 */
export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
    function IconButton({ type = 'button', tone = 'inverted', ...rest }, ref) {
        return (
            <StyledIconButton ref={ref} type={type} $tone={tone} {...rest} />
        );
    },
);
