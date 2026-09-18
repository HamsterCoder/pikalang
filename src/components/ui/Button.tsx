import { ButtonHTMLAttributes } from 'react';
import { styled } from 'styled-components';

import {
    buttonStyles,
    ButtonSize,
    ButtonStyleProps,
    ButtonTone,
    ButtonVariant,
} from '@components/ui/Button.styles';

export type { ButtonVariant, ButtonTone, ButtonSize };

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    tone?: ButtonTone;
    size?: ButtonSize;
}

const StyledButton = styled.button<ButtonStyleProps>`
    ${buttonStyles}
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
