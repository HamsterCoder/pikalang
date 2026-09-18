import { styled } from 'styled-components';
import { Link, LinkProps } from 'react-router';

import {
    buttonStyles,
    ButtonSize,
    ButtonStyleProps,
    ButtonTone,
    ButtonVariant,
} from '@components/ui/Button.styles';

export interface ButtonLinkProps extends LinkProps {
    variant?: ButtonVariant;
    tone?: ButtonTone;
    size?: ButtonSize;
}

const StyledLink = styled(Link)<ButtonStyleProps>`
    ${buttonStyles}
`;

/**
 * A navigation control that looks like `Button`. Use it whenever the action is
 * "go somewhere" — a `<button>` inside a card-wide link is not valid markup,
 * and a real link keeps middle-click and open-in-new-tab working.
 */
export const ButtonLink = ({
    variant = 'filled',
    tone = 'accent',
    size = 'medium',
    ...rest
}: ButtonLinkProps) => {
    return (
        <StyledLink $variant={variant} $tone={tone} $size={size} {...rest} />
    );
};
