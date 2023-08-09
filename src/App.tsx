import { useCallback, useReducer } from 'react';
import { CssBaseline, ThemeProvider } from '@mui/material';

// TODO fix relative import
import { Lesson, LessonDescription } from './components/Lesson/Lesson';
import { LessonList } from './components/LessonList/LessonList';
import { ChallengeDescription } from './components/Challenge/types';
import { theme } from './themes/default';

import { challenges as challenges1 } from './lessons/lesson-1';
import { challenges as challenges2 } from './lessons/lesson-2';
import { challenges as challenges3 } from './lessons/lesson-3';

const lessonsMap: Record<string, ChallengeDescription[]> = {
  '1': challenges1,
  '2': challenges2,
  '3': challenges3,
};

function shuffle<T>(array: T[]) {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}

const lessons: LessonDescription[] = [
  {
    id: '1',
    name: 'Овощи 1',
    topic: 'Еда',
    url: 'lesson-1',
    image: 'vegetables',
    description: 'Учим названия некоторых овощей'
  },
  {
    id: '2',
    name: 'Фрукты 1',
    topic: 'Еда',
    url: 'lesson-2',
    image: 'fruit',
    description: 'Учим названия некоторых фруктов'
  },
  {
    id: '3',
    name: 'Ягоды 1',
    topic: 'Еда',
    url: 'lesson-3',
    image: 'berries',
    description: 'Учим названия некоторых ягод'
  }
];

enum AppActionType {
  START_LESSON,
  COMPLETE_LESSON
}

interface AppAction {
  type: AppActionType;
  data: Record<string, any>
}

enum PageType {
  LESSON_LIST,
  LESSON
}

interface AppState {
  page: PageType,
  params: Record<string, any>
}

function appStateReducer(state: AppState, {type, data}: AppAction): AppState {
  if (type === AppActionType.START_LESSON) {
    return {
        ...state,
        page: PageType.LESSON,
        params: {
          ...state.params,
          lessonId: data.id
        }
    };
  } else if (type === AppActionType.COMPLETE_LESSON) {
    return {
        ...state,
        page: PageType.LESSON_LIST
    };
  }

  return state;
}

function App() {
  const [{page, params}, dispatch] = useReducer(appStateReducer, {
    page: PageType.LESSON_LIST,
    params: {}
  });

  const handleLessonSelect = useCallback((id: string) => {
    console.log('handleLessonSelect', id);
    dispatch({ type: AppActionType.START_LESSON, data: { id }});
  }, [dispatch]);

  const handleLessonComplete = useCallback((id: string) => {
    console.log('handleLessonComplete', id);
    dispatch({ type: AppActionType.COMPLETE_LESSON, data: { id }});
  }, [dispatch]);

  console.log(page, params);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {page === PageType.LESSON_LIST && <LessonList lessons={lessons} onLessonSelect={handleLessonSelect}/>}
        {page === PageType.LESSON && <Lesson description={lessons[Number(params.lessonId) - 1]} challenges={shuffle(lessonsMap[params.lessonId].slice(0, 10))} onComplete={handleLessonComplete}/>}
      </ThemeProvider>
    </>
  )
}

export default App
