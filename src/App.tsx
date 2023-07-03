import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css'

import { Challenge } from './components/Challenge/Challenge';
import { CssBaseline } from '@mui/material';

function App() {
  return (
    <>
      <CssBaseline />
      <Challenge type="question-to-baloons" data={{}}/>
    </>
  )
}

export default App
