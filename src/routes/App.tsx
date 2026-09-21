import { useEffect, useState } from 'react';
import { createHashRouter, redirect } from 'react-router';
import { RouterProvider } from 'react-router/dom';
import { ThemeProvider } from 'styled-components';

import { LessonPath } from '@routes/LessonPath.tsx';
import { ConversationList } from '@routes/ConversationList.tsx';
import { loader as conversationListLoader } from '@routes/ConversationList.loader';
import { Conversation } from '@routes/Conversation.tsx';
import { loader as conversationLoader } from '@routes/Conversation.loader';
import { WordTopics } from '@routes/WordTopics.tsx';
import { Settings } from '@routes/Settings.tsx';

import { AppLayout } from '@routes/AppLayout';
import { loader as appLayoutLoader } from '@routes/AppLayout.loader';

import { LessonView } from '@components/LessonView/LessonView';
import { WordLessonView } from '@components/WordLesson/WordLessonView';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';
import { LoadingError } from '@components/LoadingError';

import { tokens } from '@themes/tokens';
import { GlobalStyle } from '@themes/GlobalStyle';
import { TooltipProvider } from '@components/ui/Tooltip';
import { EnvContext } from '@routes/EnvContext';
import { SettingsContext } from '@routes/SettingsContext';
import { useSettingsState } from '@hooks/useSettingsState';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

const router = createHashRouter([
    {
        path: '/',
        element: <AppLayout />,
        errorElement: <ErrorPage />,
        loader: appLayoutLoader,
        children: [
            {
                index: true,
                loader: async () => {
                    return redirect('/lessons/');
                },
            },
            {
                path: '/lessons/',
                element: <LessonPath />,
            },
            {
                path: '/conversations/',
                element: <ConversationList />,
                loader: conversationListLoader,
            },
            {
                path: '/words/',
                element: <WordTopics />,
            },
            {
                path: '/settings/',
                element: <Settings />,
            },
        ],
    },
    {
        path: '/lessons/:lessonTopic/:lessonId/',
        element: <LessonView />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/words/:topicName/:setNumber/',
        element: <WordLessonView />,
        errorElement: (
            <LoadingError
                name={'Word set'}
                recoveryTo="/words/"
                recoveryMessage="View available topics"
            />
        ),
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
    const settings = useSettingsState();

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
                        <SettingsContext.Provider value={settings}>
                            <RouterProvider router={router} />
                        </SettingsContext.Provider>
                    </EnvContext.Provider>
                </TooltipProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};
