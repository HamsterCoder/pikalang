import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

export interface ChipProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    label: string;
}

const StyledChip = styled.button`
    display: inline-flex;
    align-items: center;

    height: 32px;
    padding: 0 11px;
    border: 1px solid ${({ theme }) => theme.color.accentBorder};
    border-radius: ${({ theme }) => theme.radius.pill};

    color: ${({ theme }) => theme.color.accent};
    background-color: transparent;

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme }) => theme.text.chip.size};
    font-weight: ${({ theme }) => theme.text.chip.weight};
    line-height: ${({ theme }) => theme.text.chip.lineHeight};
    white-space: nowrap;

    cursor: pointer;
    transition: background-color ${({ theme }) => theme.transition.fast};

    &:hover:not(:disabled) {
        background-color: ${({ theme }) => theme.color.accentWash};
    }

    &:disabled {
        color: ${({ theme }) => theme.color.disabledText};
        border-color: ${({ theme }) => theme.color.disabledSurface};
        cursor: default;
    }
`;

export const Chip = ({ label, type = 'button', ...rest }: ChipProps) => {
    return (
        <StyledChip type={type} {...rest}>
            {label}
        </StyledChip>
    );
};
