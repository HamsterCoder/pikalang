import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

// TODO fix relative import
import { Challenge, ChallengeType } from './components/Challenge/Challenge';
import { CssBaseline } from '@mui/material';

const testChallenge = {
  type: ChallengeType.QUESTION_TO_CHIPS,
  data: {
    question: 'Šta je ovo?',
    answer: 'Ovo je jabuka',
    chips: ['Ovo', 'jabuka', 'borovnica', 'je'],
    image: 'apple',
  }
};

function App() {
  return (
    <>
      <CssBaseline />
      <Challenge {...testChallenge} />
    </>
  )
}

export default App
