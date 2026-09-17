import { ButtonHTMLAttributes, forwardRef } from 'react';
import { styled } from 'styled-components';

export type IconButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StyledIconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    padding: 8px;
    border: none;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: inherit;
    background-color: transparent;
    cursor: pointer;

    transition: background-color ${({ theme }) => theme.transition.fast};

    &:hover:not(:disabled) {
        background-color: rgba(255, 255, 255, 0.15);
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
    function IconButton({ type = 'button', ...rest }, ref) {
        return <StyledIconButton ref={ref} type={type} {...rest} />;
    },
);
