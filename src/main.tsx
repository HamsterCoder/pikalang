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
import { LessonList } from '@components/LessonList/LessonList.tsx';
import { Lesson } from '@components/Lesson/Lesson.tsx';
import { ErrorPage } from '@components/ErrorPage/ErrorPage';

const router = createHashRouter([
    {
        path: '/',
        element: <LessonList />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/lessons/',
        element: <LessonList />,
        errorElement: <ErrorPage />,
    },
    {
        path: '/lessons/:lessonTopic/:lessonId/',
        element: <Lesson />,
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
