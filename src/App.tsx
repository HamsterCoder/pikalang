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
      answer: ['Ovo je jabuka'],
      chips: ['Ovo', 'jabuka', 'kaisija', 'je'],
      image: 'apple',
    }
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je kaisija'],
      chips: ['Ovo', 'šljiva', 'kaisija', 'je'],
      image: 'apricot',
    }
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je breskva'],
      chips: ['Ovo', 'breskva', 'jabuka', 'je'],
      image: 'peach',
    }
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je jagoda'],
      chips: ['jagoda', 'breskva', 'Ovo', 'je', 'su'],
      image: 'strawberry',
    },
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo su jabuka i kruška', 'Ovo su kruška i jabuka'],
      chips: ['jabuka', 'Ovo', 'je', 'su', 'i', 'kruška'],
      image: 'apple-pear',
    }
  },
  {
    type: ChallengeType.QUESTION_TO_CHIPS,
    data: {
      question: 'Šta je ovo?',
      answer: ['Ovo je kruška'],
      chips: ['jabuka', 'Ovo', 'je', 'su', 'kruška'],
      image: 'pear',
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

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Lesson no={1} challenges={shuffle(challenges.slice())}/>
      </ThemeProvider>
    </>
  )
}

export default App
