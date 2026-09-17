import { ReactNode } from 'react';
import { styled } from 'styled-components';

import { TextToken } from '@themes/tokens';

type Color = 'default' | 'inverted' | 'currentColor';
type Type = 'primary' | 'secondary' | 'dialog';

export interface TextProps {
    children: ReactNode;
    color?: Color;
    withMargin?: boolean;
    type: Type;
    className?: string;
}

const colorMap: Record<Color, string> = {
    // currentColor can be used for dynamic scenarios,
    // where you want to control the color from outside with css
    currentColor: 'currentColor',
    default: 'var(--text-color)',
    inverted: 'var(--inverted-text-color)',
};

const textMap: Record<Type, TextToken> = {
    primary: 'text_primary',
    secondary: 'text_secondary',
    dialog: 'dialog',
};

const StyledText = styled.p<{
    $token: TextToken;
    $color: Color;
    $withMargin: boolean;
}>`
    margin: 0;
    margin-bottom: ${({ $withMargin }) => ($withMargin ? '1rem' : '0')};

    font-family: ${({ theme, $token }) =>
        $token === 'dialog' ? theme.font.dialog : theme.font.base};
    font-size: ${({ theme, $token }) => theme.text[$token].size};
    font-weight: ${({ theme, $token }) => theme.text[$token].weight};
    line-height: ${({ theme, $token }) => theme.text[$token].lineHeight};
    color: ${({ $color }) => colorMap[$color]};
`;

export const Text = ({
    children,
    color = 'default',
    withMargin = true,
    type,
    className,
}: TextProps) => {
    return (
        <StyledText
            className={className}
            $token={textMap[type]}
            $color={color}
            $withMargin={withMargin}
        >
            {children}
        </StyledText>
    );
};
