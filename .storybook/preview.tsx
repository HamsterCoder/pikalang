import type { Preview } from '@storybook/react';

// Providing Css Context and MUI Theme
// https://storybook.js.org/recipes/@mui/material
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { theme } from '../src/themes/default';
import '../src/index.css';

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
    },

    // TODO
    // @ts-ignore
    decorators: [
        withThemeFromJSXProvider({
            GlobalStyles: CssBaseline,
            Provider: ThemeProvider,
            themes: {
                // Provide your custom themes here
                light: theme,
            },
            defaultTheme: 'light',
        }),
    ],
};

export default preview;
