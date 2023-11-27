import React from 'react';
import ReactDOM from 'react-dom/client';
import { theme } from './themes/default';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import './index.css';

import { createHashRouter, RouterProvider } from 'react-router-dom';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { Lesson } from '@components/Lesson/Lesson.tsx';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';

// TODO add an alias for routes
import { App, appLoader } from './routes/App.tsx';
import { LessonList } from './routes/LessonList.tsx';
import {
    DialogList,
    loader as dialogListLoader,
} from './routes/DialogList.tsx';
import { Dialog } from './routes/Dialog.tsx';

const router = createHashRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        loader: appLoader,
        children: [
            {
                index: true,
                element: <LessonList />,
            },
            {
                path: '/lessons/',
                element: <LessonList />,
            },
            {
                path: '/dialogs/',
                element: <DialogList />,
                loader: dialogListLoader,
            },
        ],
    },
    {
        path: '/lessons/:lessonTopic/:lessonId/',
        element: <Lesson />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/dialogs/:dialogId/',
        element: <Dialog />,
        errorElement: <ErrorPage />,
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
