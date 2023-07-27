import { useReducer } from 'react';

import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';

// TODO fix relative import
import { Lesson, LessonDescription } from './components/Lesson/Lesson';
import { LessonList } from './components/LessonList/LessonList';

import { challenges as challenges1 } from './lessons/lesson-1';
import { challenges as challenges2 } from './lessons/lesson-2';
import { challenges as challenges3 } from './lessons/lesson-3';

// TODO fix any
const lessonsMap: Record<string, ChallengeDescription[]> = {
  '1': challenges1,
  '2': challenges2,
  '3': challenges3,
};

const theme = createTheme({
  palette: {
    text: {
      primary: '#54196a'
    },
    primary: {
      main: '#AA66CC'
    },
    secondary: {
      main: '#33B5E5'
    },
    success: {
      main: '#99CC00'
    },
    error: {
      main: '#FF4444'
    }
  }
});

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
    name: 'Vegetables',
    topic: 'Food',
    url: 'lesson-1',
    image: 'vegetables',
    description: 'Learn the names of vegetables.'
  },
  {
    id: '2',
    name: 'Fruit',
    topic: 'Food',
    url: 'lesson-2',
    image: 'fruit',
    description: 'Learn the names of fruit.'
  },
  {
    id: '3',
    name: 'Berries',
    topic: 'Food',
    url: 'lesson-3',
    image: 'berries',
    description: 'Learn the names of berries.'
  }
];

enum AppActionType {
  START_LESSON,
  FINISH_LESSON
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
  } else if (type === AppActionType.FINISH_LESSON) {
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

  function handleLessonSelect(id: string) {
    console.log('handleLessonSelect', id);
    dispatch({ type: AppActionType.START_LESSON, data: { id }});
  }

  console.log(page, params);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {page === PageType.LESSON_LIST && <LessonList lessons={lessons} onLessonSelect={handleLessonSelect}/>}
        {page === PageType.LESSON && <Lesson description={lessons[Number(params.lessonId) - 1]} challenges={shuffle(lessonsMap[params.lessonId].slice())}/>}
      </ThemeProvider>
    </>
  )
}

export default App
