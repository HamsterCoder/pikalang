import { ReactNode } from 'react';
import { Typography, TypographyProps } from '@mui/material';

type Color = 'default' | 'inverted' | 'currentColor';

export interface TextProps {
    children: ReactNode;
    sx?: TypographyProps['sx'];
    color?: Color;
}

const colorMap: Record<Color, string> = {
    // currentColor can be used for dynamic scenarios,
    // where you want to control the color from outside with css
    currentColor: 'currentColor',
    default: 'var(--heading-color)',
    inverted: 'var(--inverted-text-color)',
};

export const Text = ({ children, color = 'default' }: TextProps) => {
    return (
        <Typography variant="text_primary" color={colorMap[color]}>
            {children}
        </Typography>
    );
};

export default Text;
