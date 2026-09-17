import { createGlobalStyle } from 'styled-components';

import { tokens } from './tokens';

/**
 * Global reset plus the CSS custom properties derived from the tokens.
 *
 * Components written with styled-components should read `${({ theme }) => ...}`;
 * the custom properties exist for plain CSS blocks and for values that need to
 * cascade (`currentColor` styling, container queries).
 */
export const GlobalStyle = createGlobalStyle`
    :root {
        --primary-accent: ${tokens.color.accent};
        --primary-accent-faded: ${tokens.color.accentFaded};
        --primary-accent-track: ${tokens.color.accentTrack};

        --heading-color: ${tokens.color.heading};
        --text-color: ${tokens.color.text};
        --inverted-text-color: ${tokens.color.textInverted};
        --hint-color: ${tokens.color.hint};

        --surface-color: ${tokens.color.surface};
        --surface-muted-color: ${tokens.color.surfaceMuted};

        --alert-error: ${tokens.color.error};
        --alert-success: ${tokens.color.success};
        --alert-warning: ${tokens.color.warning};

        --font-base: ${tokens.font.base};
        --font-dialog: ${tokens.font.dialog};
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: ${tokens.font.base};
        font-size: 16px;
        color: ${tokens.color.text};
        background-color: ${tokens.color.surface};
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
    }
`;
