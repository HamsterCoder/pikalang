import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

// TODO fix relative import
import { Challenge, ChallengeType } from './components/Challenge/Challenge';
import { CssBaseline, Typography, ThemeProvider, createTheme } from '@mui/material';
import {useState} from 'react';

const challenges = [
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: 'Ovo je jabuka',
      chips: ['Ovo', 'jabuka', 'kaisija', 'je'],
      image: 'apple',
    }
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: 'Ovo je kaisija',
      chips: ['Ovo', 'šljiva', 'kaisija', 'je'],
      image: 'apricot',
    }
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: 'Ovo je breskva',
      chips: ['Ovo', 'breskva', 'jabuka', 'je'],
      image: 'peach',
    }
  }
];

const theme = createTheme({
  palette: {
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

function App() {
  const lessonState = {
    no: 1,
    current: 0,
    total: 3,
    challenges: challenges
  };

  const [challenge, setChallenge] = useState(0);

  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="Lesson__header">
          <Typography variant="h4">Lesson {lessonState.no}</Typography>
          <Typography className="Lesson__challenge" variant="h4">{lessonState.current}/{lessonState.total}</Typography>
        </div>
        <Challenge {...challenges[challenge]} />
      </ThemeProvider>
    </>
  )
}

export default App
