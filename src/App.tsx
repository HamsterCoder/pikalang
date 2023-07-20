import './App.css'

// TODO fix relative import
import { Lesson } from './components/Lesson/Lesson';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { challenges } from './lessons/lesson-1';

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
