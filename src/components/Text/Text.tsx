import { ReactNode } from 'react';
import { Typography } from '@mui/material';

type Color = 'default' | 'inverted' | 'currentColor';
type Type = 'primary' | 'secondary' | 'dialog';
type TypographyVariant = 'text_primary' | 'text_secondary' | 'dialog';

export interface TextProps {
    children: ReactNode;
    color?: Color;
    withMargin?: boolean;
    type: Type;
}

const colorMap: Record<Color, string> = {
    // currentColor can be used for dynamic scenarios,
    // where you want to control the color from outside with css
    currentColor: 'currentColor',
    default: 'var(--text-color)',
    inverted: 'var(--inverted-text-color)',
};

const textMap: Record<Type, TypographyVariant> = {
    primary: 'text_primary',
    secondary: 'text_secondary',
    dialog: 'dialog',
};

export const Text = ({
    children,
    color = 'default',
    withMargin = true,
    type,
}: TextProps) => {
    const sx = withMargin ? { marginBottom: '1rem' } : {};

    return (
        <Typography variant={textMap[type]} color={colorMap[color]} sx={sx}>
            {children}
        </Typography>
    );
};
