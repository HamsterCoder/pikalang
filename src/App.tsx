import './App.css'

// TODO fix relative import
import { Challenge, ChallengeType } from './components/Challenge/Challenge';
import { Lesson } from './components/Lesson/Lesson';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Lesson no={1} challenges={challenges}/>
      </ThemeProvider>
    </>
  )
}

export default App
