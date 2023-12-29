import { createTheme } from '@mui/material';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        heading_l: React.CSSProperties;
        heading_m: React.CSSProperties;
        heading_s: React.CSSProperties;
        text_primary: React.CSSProperties;
        text_secondary: React.CSSProperties;
        dialog: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        heading_l?: React.CSSProperties;
        heading_m?: React.CSSProperties;
        heading_s?: React.CSSProperties;
        text_primary?: React.CSSProperties;
        text_secondary?: React.CSSProperties;
        dialog?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        heading_l: true;
        heading_m: true;
        heading_s: true;
        text_primary: true;
        text_secondary: true;
        dialog: true;
        h6: false;
        h5: false;
        h4: false;
        h3: false;
        h2: false;
        h1: false;
        body1: false;
        body2: false;
    }
}

export const theme = createTheme({
    // The pallete does not support vars =(
    palette: {
        primary: {
            main: '#9b2d7f',
        },
        success: {
            main: '#99CC00',
        },
        error: {
            main: '#FF4444',
        },
    },

    typography: {
        fontFamily: 'Montserrat, Arial, Helvetica, sans-serif',
        heading_l: {
            fontSize: '2rem',
            fontWeight: '500',
            color: 'var(--heading-color)',
        },
        heading_m: {
            fontSize: '1.6rem',
            fontWeight: '500',
            color: 'var(--heading-color)',
        },
        heading_s: {
            fontSize: '1.2rem',
            fontWeight: '500',
            color: 'var(--heading-color)',
        },
        text_primary: {
            fontSize: '1rem',
            fontWeight: '400',
            color: 'var(--text-color)',
        },
        text_secondary: {
            fontSize: '1rem',
            fontWeight: '300',
            color: 'var(--text-color)',
        },
        dialog: {
            fontFamily: `'Shantell Sans', Helvetica, Arial, sans-serif`,
            fontSize: '1.2rem',
            fontWeight: '300',
            color: 'currentColor',
        },
        // Disable other heading variants
        h6: undefined,
        h5: undefined,
        h4: undefined,
        h3: undefined,
        h2: undefined,
        h1: undefined,
    },

    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                },
            },
        },
        MuiTypography: {
            defaultProps: {
                variantMapping: {
                    // Map the new variant to render a <h1> by default
                    heading_l: 'h1',
                    heading_m: 'h2',
                    heading_s: 'h3',
                    text_primary: 'p',
                    text_secondary: 'p',
                },
            },
        },
    },
});
