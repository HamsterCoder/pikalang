import { Typography, TypographyProps } from '@mui/material';
import { ReactNode } from 'react';

type Size = 's' | 'm' | 'l';
type Variant = 'heading_xs' | 'heading_s' | 'heading_m' | 'heading_l';
type Color = 'default' | 'inverted' | 'currentColor';

export interface HeadingProps {
    size: Size;
    children: ReactNode;
    color?: Color;
    sx?: TypographyProps['sx'];
    mobile?: boolean;
}

const sizeMapByPlatform: {
    mobile: Record<Size, Variant>;
    desktop: Record<Size, Variant>;
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

export const Heading = function ({
    children,
    sx,
    size,
    mobile = false,
    color = 'default',
}: HeadingProps) {
    const sizeMap = mobile
        ? sizeMapByPlatform.mobile
        : sizeMapByPlatform.desktop;

    // TODO add xs size to variants
    return (
        <Typography
            variant={sizeMap[size]}
            component={elementMap[size]}
            color={colorMap[color]}
            sx={sx}
        >
            {children}
        </Typography>
    );
};
