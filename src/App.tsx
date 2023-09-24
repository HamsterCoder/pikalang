import { useCallback, useReducer } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Lesson, LessonDescription } from '@components/Lesson/Lesson';
import { LessonList } from '@components/LessonList/LessonList';
import { ChallengeDescription } from '@components/Challenge/types';
import { theme } from './themes/default';
import { shuffle } from './utils/shuffle';

import {
    challenges as challenges1,
    description as description1,
} from './lessons/lesson-1-ru';
import {
    challenges as challenges2,
    description as description2,
} from './lessons/lesson-2-ru';
import {
    challenges as challenges3,
    description as description3,
} from './lessons/lesson-3-ru';
import {
    challenges as challenges4,
    description as description4,
} from './lessons/lesson-4-ru';
import {
    challenges as challenges5,
    description as description5,
} from './lessons/lesson-5-ru';
import {
    challenges as challenges6,
    description as description6,
} from './lessons/lesson-6-ru';

import {
    challenges as challenges7,
    description as description7,
} from './lessons/lesson-7-ru';

const lessonsMap: Record<string, ChallengeDescription[]> = {
    [description1.id]: challenges1,
    [description2.id]: challenges2,
    [description3.id]: challenges3,
    [description4.id]: challenges4,
    [description5.id]: challenges5,
    [description6.id]: challenges6,
    [description7.id]: challenges7,
};

const descriptionMap: Record<string, LessonDescription> = {
    [description1.id]: description1,
    [description2.id]: description2,
    [description3.id]: description3,
    [description4.id]: description4,
    [description5.id]: description5,
    [description6.id]: description6,
    [description7.id]: description7,
};

const lessons: LessonDescription[] = [
    description1,
    description2,
    description3,
    description4,
    description5,
    description6,
    description7,
];

enum AppActionType {
    START_LESSON,
    COMPLETE_LESSON,
}

interface AppAction {
    type: AppActionType;
    data: Record<string, any>;
}

enum PageType {
    LESSON_LIST,
    LESSON,
}

interface AppState {
    page: PageType;
    params: Record<string, any>;
}

function appStateReducer(state: AppState, { type, data }: AppAction): AppState {
    if (type === AppActionType.START_LESSON) {
        return {
            ...state,
            page: PageType.LESSON,
            params: {
                ...state.params,
                lessonId: data.id,
            },
        };
    } else if (type === AppActionType.COMPLETE_LESSON) {
        return {
            ...state,
            page: PageType.LESSON_LIST,
        };
    }

    return state;
}

function App() {
    const [{ page, params }, dispatch] = useReducer(appStateReducer, {
        page: PageType.LESSON_LIST,
        params: {},
    });

    const handleLessonSelect = useCallback(
        (id: string) => {
            console.log('handleLessonSelect', id);
            dispatch({ type: AppActionType.START_LESSON, data: { id } });
        },
        [dispatch],
    );

    const handleLessonComplete = useCallback(
        (id: string) => {
            console.log('handleLessonComplete', id);
            dispatch({ type: AppActionType.COMPLETE_LESSON, data: { id } });
        },
        [dispatch],
    );

    console.log(page, params);
    console.log(lessonsMap);

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                {page === PageType.LESSON_LIST && (
                    <LessonList
                        lessons={lessons}
                        onLessonSelect={handleLessonSelect}
                    />
                )}
                {page === PageType.LESSON && (
                    <Lesson
                        description={descriptionMap[params.lessonId]}
                        challenges={shuffle(lessonsMap[params.lessonId]).slice(
                            0,
                            10,
                        )}
                        onComplete={handleLessonComplete}
                    />
                )}
            </ThemeProvider>
        </>
    );
}

export default App;
