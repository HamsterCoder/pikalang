import { ButtonHTMLAttributes, forwardRef } from 'react';
import { styled } from 'styled-components';

export type FabProps = ButtonHTMLAttributes<HTMLButtonElement>;

const StyledFab = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;

    width: 48px;
    height: 48px;
    border: none;
    border-radius: ${({ theme }) => theme.radius.circle};

    color: ${({ theme }) => theme.color.textInverted};
    background-color: ${({ theme }) => theme.color.accent};
    box-shadow: ${({ theme }) => theme.shadow.floating};

    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transition.fast};

    &:hover {
        background-color: ${({ theme }) => theme.color.heading};
    }
`;

/** Floating action button; forwards a ref so it can act as a Radix trigger. */
export const Fab = forwardRef<HTMLButtonElement, FabProps>(function Fab(
    { type = 'button', ...rest },
    ref,
) {
    return <StyledFab ref={ref} type={type} {...rest} />;
});
