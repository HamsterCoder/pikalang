import type { Decorator, Preview } from '@storybook/react';

// Providing Css Context and MUI Theme
// https://storybook.js.org/recipes/@mui/material
import { ThemeProvider, CssBaseline } from '@mui/material';
import { withThemeFromJSXProvider } from '@storybook/addon-themes';
import { theme } from '../src/themes/default';
import '../src/index.css';

import { createMemoryRouter, RouterProvider } from 'react-router-dom';

const reactRouterDecorator: Decorator = (Story) => {
    const router = createMemoryRouter(
        [
            {
                path: '/*',
                element: <Story />,
            },
        ],
        {
            initialEntries: ['/lessons/'],
        },
    );
    return <RouterProvider router={router} />;
};

const preview: Preview = {
    parameters: {
        actions: { argTypesRegex: '^on[A-Z].*' },
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            default: 'white',
            values: [
                {
                    name: 'white',
                    value: '#ffffff',
                },
                {
                    name: 'accent',
                    value: 'var(--primary-accent)',
                },
            ],
        },
    },

    decorators: [
        // TODO
        // @ts-ignore
        withThemeFromJSXProvider({
            GlobalStyles: CssBaseline,
            Provider: ThemeProvider,
            themes: {
                // Provide your custom themes here
                light: theme,
            },
            defaultTheme: 'light',
        }),
        reactRouterDecorator,
    ],
};

export default preview;
