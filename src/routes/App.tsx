import { useEffect, useState } from 'react';
import { createHashRouter, redirect } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from 'styled-components';

import { LessonList } from '@routes/LessonList.tsx';
import { ConversationList } from '@routes/ConversationList.tsx';
import { loader as conversationListLoader } from '@routes/ConversationList.loader';
import { Conversation } from '@routes/Conversation.tsx';
import { loader as conversationLoader } from '@routes/Conversation.loader';

import { AppModesLayout } from '@routes/AppModesLayout';
import { loader as appModesLayoutLoader } from '@routes/AppModesLayout.loader';

import { Lesson } from '@components/Lesson/Lesson.tsx';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';
import { LoadingError } from '@components/LoadingError';

import { tokens } from '@themes/tokens';
import { GlobalStyle } from '@themes/GlobalStyle';
import { TooltipProvider } from '@components/ui/Tooltip';
import { EnvContext } from '@routes/EnvContext';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: '/',
        element: <AppModesLayout />,
        errorElement: <ErrorPage />,
        loader: appModesLayoutLoader,
        children: [
            {
                index: true,
                loader: async () => {
                    return redirect('/lessons/');
                },
            },
            {
                path: '/lessons/',
                element: <LessonList />,
            },
            {
                path: '/conversations/',
                element: <ConversationList />,
                loader: conversationListLoader,
            },
        ],
    },
    {
        path: '/lessons/:lessonTopic/:lessonId/',
        element: <Lesson />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/conversations/:conversationId/',
        loader: conversationLoader,
        element: <Conversation />,
        errorElement: (
            <LoadingError
                name={'Conversation'}
                recoveryTo="/conversations/"
                recoveryMessage="View available conversations"
            />
        ),
    },
]);

// TODO App itself is not a route, move it to a different folder
export const App = () => {
    const [envContext, setEnvContext] = useState({ mobile: false });

    useEffect(() => {
        console.log('LOG::App.effect run');

        // TODO Debounce the observer callback

        const resizeObserver = new ResizeObserver((entries) => {
            console.log('LOG::App.effect computing env');

            let updatedInlineSize;

            if (typeof entries[0]['borderBoxSize'] !== 'undefined') {
                updatedInlineSize = entries[0].borderBoxSize[0].inlineSize;
            } else {
                updatedInlineSize = entries[0].contentRect.width;
            }

            setEnvContext({
                mobile: updatedInlineSize <= 840,
            });
        });

        resizeObserver.observe(document.getElementById('root') as HTMLElement);

        return () => {
            console.log('LOG::App.effect clean');
            resizeObserver.disconnect();
        };
    }, []);

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={tokens}>
                <GlobalStyle />
                <TooltipProvider delayDuration={100}>
                    <EnvContext.Provider value={envContext}>
                        <RouterProvider router={router} />
                    </EnvContext.Provider>
                </TooltipProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
