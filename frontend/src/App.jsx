import React from 'react';
import './App.css';
import SleepTimer from './components/SleepTimer';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from "./theme";
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';

function App() {
  return (
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <SleepTimer />
        </MuiPickersUtilsProvider>
      </ThemeProvider>
  );
}

export default App;
