import { useCallback, useReducer } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

import { Lesson, LessonDescription } from '@components/Lesson/Lesson';
import { LessonList } from '@components/LessonList/LessonList';
import { ChallengeDescription } from '@components/Challenge/types';
import { theme } from './themes/default';
import { shuffle } from './utils/shuffle';

import { challenges as challenges1, description as description1 } from './lessons/lesson-1-ru';
import { challenges as challenges2, description as description2 } from './lessons/lesson-2-ru';
import { challenges as challenges3, description as description3 } from './lessons/lesson-3-ru';
import { challenges as challenges4, description as description4 } from './lessons/lesson-4-ru';
import { challenges as challenges5, description as description5 } from './lessons/lesson-5-ru';

const lessonsMap: Record<string, ChallengeDescription[]> = {
    '1': challenges1,
    '2': challenges2,
    '3': challenges3,
    '4': challenges4,
    '5': challenges5,
};

const lessons: LessonDescription[] = [
    description1,
    description2,
    description3,
    description4,
    description5,
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
                        description={lessons[Number(params.lessonId) - 1]}
                        challenges={shuffle(
                            lessonsMap[params.lessonId].slice(0, 10),
                        )}
                        onComplete={handleLessonComplete}
                    />
                )}
            </ThemeProvider>
        </>
    );
}

export default App;
