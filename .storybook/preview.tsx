import type { Decorator, Preview } from '@storybook/react-vite';
import { ThemeProvider } from 'styled-components';

import { tokens } from '../src/themes/tokens';
import { GlobalStyle } from '../src/themes/GlobalStyle';
import { TooltipProvider } from '../src/components/ui/Tooltip';

import { createMemoryRouter } from 'react-router';
import { RouterProvider } from 'react-router/dom';

const themeDecorator: Decorator = (Story) => (
    <ThemeProvider theme={tokens}>
        <GlobalStyle />
        <TooltipProvider delayDuration={100}>
            <Story />
        </TooltipProvider>
    </ThemeProvider>
);

/**
 * Stories render inside a memory router so `Link` and `NavLink` work. Set the
 * `initialRoute` parameter on a story to control which destination reads as
 * active.
 */
const reactRouterDecorator: Decorator = (Story, { parameters }) => {
    const router = createMemoryRouter(
        [
            {
                path: '/*',
                element: <Story />,
            },
        ],
        {
            initialEntries: [
                (parameters.initialRoute as string | undefined) ?? '/lessons/',
            ],
        },
    );
    return <RouterProvider router={router} />;
};

const preview: Preview = {
    parameters: {
        controls: {
            matchers: {
                color: /(background|color)$/i,
                date: /Date$/i,
            },
        },
        backgrounds: {
            options: {
                white: { name: 'white', value: '#ffffff' },
                accent: { name: 'accent', value: tokens.color.accent },
            },
        },
    },

    initialGlobals: {
        backgrounds: { value: 'white' },
    },

    decorators: [themeDecorator, reactRouterDecorator],
};

export default preview;
