/**
 * Design tokens: the single source of truth for the visual language.
 *
 * Restyling the app means editing this file. Components must read values from
 * here (through the styled-components theme, or the CSS custom properties that
 * `GlobalStyle` derives from it) instead of hardcoding colours or sizes.
 */
export const tokens = {
    color: {
        // Brand
        accent: '#9b2d7f',
        accentFaded: '#c953ab',
        accentBorder: 'rgba(155, 45, 127, 0.7)',
        accentWash: 'rgba(155, 45, 127, 0.06)',
        accentTrack: '#d9afce',

        // Text
        heading: '#7d0a60',
        text: '#353535',
        textInverted: '#ffffff',
        hint: '#525252',

        // Surfaces
        surface: '#ffffff',
        surfaceMuted: '#f1f1f1',
        overlay: 'rgba(97, 97, 97, 0.92)',

        // Status
        success: '#99cc00',
        successHover: '#7aa300',
        successSurface: '#f6faea',
        successText: '#455514',
        error: '#ff4444',
        errorSurface: '#fff0f0',
        errorText: '#662a2a',
        warning: '#ffbb33',

        // States
        disabledSurface: 'rgba(0, 0, 0, 0.12)',
        disabledText: 'rgba(0, 0, 0, 0.26)',
        contrastText: 'rgba(0, 0, 0, 0.87)',
    },

    font: {
        base: 'Montserrat, Arial, Helvetica, sans-serif',
        dialog: "'Shantell Sans', Helvetica, Arial, sans-serif",
    },

    /** Typographic scale. `size` doubles as the name used by Heading/Text. */
    text: {
        heading_l: { size: '2rem', weight: 500, lineHeight: 1.5 },
        heading_m: { size: '1.6rem', weight: 500, lineHeight: 1.5 },
        heading_s: { size: '1.2rem', weight: 500, lineHeight: 1.5 },
        heading_xs: { size: '1rem', weight: 500, lineHeight: 1.5 },
        text_primary: { size: '1rem', weight: 400, lineHeight: 1.5 },
        text_secondary: { size: '1rem', weight: 300, lineHeight: 1.5 },
        dialog: { size: '1.2rem', weight: 300, lineHeight: 1.5 },
        control: { size: '0.875rem', weight: 500, lineHeight: 1.75 },
        controlSmall: { size: '0.8125rem', weight: 500, lineHeight: 1.75 },
        chip: { size: '0.8125rem', weight: 400, lineHeight: 1.5 },
    },

    radius: {
        s: '4px',
        m: '8px',
        l: '16px',
        pill: '999px',
        circle: '50%',
    },

    shadow: {
        card: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
        raised: '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        floating:
            '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
    },

    transition: {
        fast: '0.2s ease-in',
        medium: '0.3s ease-in',
    },
} as const;

export type Tokens = typeof tokens;
export type TextToken = keyof Tokens['text'];
