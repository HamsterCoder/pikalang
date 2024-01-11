import { createContext, useEffect, useState } from 'react';
import { createHashRouter, RouterProvider, redirect } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { LessonList } from '@routes/LessonList.tsx';
import {
    ConversationList,
    loader as conversationListLoader,
} from '@routes/ConversationList.tsx';
import {
    Conversation,
    loader as conversationLoader,
} from '@routes/Conversation.tsx';

import {
    AppModesLayout,
    loader as appModesLayoutLoader,
} from '@routes/AppModesLayout';

import { Lesson } from '@components/Lesson/Lesson.tsx';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';
import { LoadingError } from '@components/LoadingError';

import { theme } from '../themes/default';

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

export const EnvContext = createContext({ mobile: false });

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
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <EnvContext.Provider value={envContext}>
                <RouterProvider router={router} />
            </EnvContext.Provider>
        </ThemeProvider>
    );
};
