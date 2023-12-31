import React from 'react';
import ReactDOM from 'react-dom/client';
import { createHashRouter, RouterProvider, redirect } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Lesson } from '@components/Lesson/Lesson.tsx';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';
import { App, loader as appLoader } from '@routes/App.tsx';
import { LessonList } from '@routes/LessonList.tsx';
import {
    ConversationList,
    loader as conversationListLoader,
} from '@routes/ConversationList.tsx';
import {
    Conversation,
    loader as conversationLoader,
} from '@routes/Conversation.tsx';
import { StyleGuide } from '@routes/StyleGuide';

import { theme } from './themes/default';
import './index.css';

import { LoadingError } from '@components/LoadingError';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        loader: appLoader,
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
        path: '/styleguide/',
        element: <StyleGuide />,
        errorElement: <ErrorPage />,
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

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <RouterProvider router={router} />
        </ThemeProvider>
    </React.StrictMode>,
);
