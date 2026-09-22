/**
 * Design tokens: the single source of truth for the visual language.
 *
 * Restyling the app means editing this file. Components must read values from
 * here (through the styled-components theme, or the CSS custom properties that
 * `GlobalStyle` derives from it) instead of hardcoding colours or sizes.
 */
export const tokens = {
    color: {
        /**
         * Brand. The accent sits at hue 315 and 55% saturation; every other
         * colour below is placed against those two numbers, which is what
         * keeps the palette reading as one family.
         */
        accent: '#9b2d7f',
        accentFaded: '#c953ab',
        accentBorder: 'rgba(155, 45, 127, 0.7)',
        accentWash: 'rgba(155, 45, 127, 0.06)',
        accentSoft: 'rgba(155, 45, 127, 0.12)',
        accentTrack: '#d9afce',

        // Text. The neutrals carry the brand hue at a whisper, so they share a
        // temperature with the tinted surfaces and lines rather than fighting
        // them.
        heading: '#7d0a60',
        text: '#372f35',
        textInverted: '#ffffff',
        hint: '#5d515a',

        // Surfaces
        surface: '#ffffff',
        surfaceMuted: '#f4f0f3',
        /** Page background behind cards, a barely tinted neutral. */
        surfaceSunken: '#fbf8fb',
        overlay: 'rgba(50, 41, 48, 0.92)',

        // Lines
        border: 'rgba(125, 10, 96, 0.14)',
        borderStrong: 'rgba(125, 10, 96, 0.3)',

        /**
         * Status. Success sits near the brand's complement, which is what makes
         * the pair read as deliberate; error keeps a red hue so it can never be
         * mistaken for the brand. Both are held at the accent's saturation, and
         * both are dark enough to carry white text, so a filled button looks the
         * same whatever it says.
         */
        success: '#1f7a59',
        successHover: '#165f44',
        successSurface: '#f1f9f6',
        successText: '#1a5b43',
        /** Lines carry the status at the weight of `border`, not at full strength. */
        successBorder: 'rgba(31, 122, 89, 0.32)',
        error: '#b6392b',
        errorHover: '#8f2d22',
        errorSurface: '#fdf3f2',
        errorText: '#772f28',
        errorBorder: 'rgba(182, 57, 43, 0.3)',

        // Warm signals: one family for both the warning and the reward.
        warning: '#c3861d',
        trophy: '#7b570f',
        trophySurface: '#faf5ea',
        trophyBorder: 'rgba(123, 87, 15, 0.35)',

        // States
        disabledSurface: 'rgba(55, 47, 53, 0.12)',
        disabledText: 'rgba(55, 47, 53, 0.38)',
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
        /** The control radius: on a 36-44px control this reads as a stadium. */
        xl: '24px',
        pill: '999px',
        circle: '50%',
    },

    shadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.06)',
        card: '0 2px 1px -1px rgba(0, 0, 0, 0.2), 0 1px 1px 0 rgba(0, 0, 0, 0.14), 0 1px 3px 0 rgba(0, 0, 0, 0.12)',
        raised: '0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12)',
        floating:
            '0 3px 5px -1px rgba(0, 0, 0, 0.2), 0 6px 10px 0 rgba(0, 0, 0, 0.14), 0 1px 18px 0 rgba(0, 0, 0, 0.12)',
    },

    transition: {
        fast: '0.2s ease-in',
        medium: '0.3s ease-in',
        /** A screen arriving: it decelerates into place. */
        enter: '0.28s ease-out',
        /** A screen leaving: quicker than it came, so the next one is not kept waiting. */
        leave: '0.18s ease-in',
    },
} as const;

export type Tokens = typeof tokens;
export type TextToken = keyof Tokens['text'];
