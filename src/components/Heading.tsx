import { ReactNode } from 'react';
import { styled } from 'styled-components';

import { TextToken } from '@themes/tokens';

type Size = 's' | 'm' | 'l';
type Color = 'default' | 'inverted' | 'currentColor';

export interface HeadingProps {
    className?: string;
    size: Size;
    children: ReactNode;
    color?: Color;
    mobile?: boolean;
    /** Adds the standard 1rem spacing below the heading. */
    gutter?: boolean;
}

const sizeMapByPlatform: {
    mobile: Record<Size, TextToken>;
    desktop: Record<Size, TextToken>;
} = {
    mobile: {
        s: 'heading_xs',
        m: 'heading_s',
        l: 'heading_m',
    },
    desktop: {
        s: 'heading_s',
        m: 'heading_m',
        l: 'heading_l',
    },
};

const elementMap: Record<Size, 'h1' | 'h2' | 'h3'> = {
    s: 'h3',
    m: 'h2',
    l: 'h1',
};

const colorMap: Record<Color, string> = {
    // currentColor can be used for dynamic scenarios,
    // where you want to control the color from outside with css
    currentColor: 'currentColor',
    default: 'var(--heading-color)',
    inverted: 'var(--inverted-text-color)',
};

const StyledHeading = styled.h1<{
    $token: TextToken;
    $color: Color;
    $gutter: boolean;
}>`
    margin: 0;
    margin-bottom: ${({ $gutter }) => ($gutter ? '1rem' : '0')};

    font-family: ${({ theme }) => theme.font.base};
    font-size: ${({ theme, $token }) => theme.text[$token].size};
    font-weight: ${({ theme, $token }) => theme.text[$token].weight};
    line-height: ${({ theme, $token }) => theme.text[$token].lineHeight};
    color: ${({ $color }) => colorMap[$color]};
`;

export const Heading = function ({
    children,
    size,
    mobile = false,
    color = 'default',
    gutter = false,
    className,
}: HeadingProps) {
    const sizeMap = mobile
        ? sizeMapByPlatform.mobile
        : sizeMapByPlatform.desktop;

    return (
        <StyledHeading
            as={elementMap[size]}
            className={className}
            $token={sizeMap[size]}
            $color={color}
            $gutter={gutter}
        >
            {children}
        </StyledHeading>
    );
};
