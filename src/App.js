import React from 'react';
import { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import MainLayout from './layouts/MainLayout';
import './App.scss';

const defaultTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#48bb78',
      light: '#7deea7',
      dark: '#008a4b'
    },
    secondary: {
      main: '#fd7e14',
      light: '#ffaf4b',
      dark: '#c34f00'
    }
  }
});

function App() {
  return (
    <NoSsr>
      <ThemeProvider theme={defaultTheme}>
        <MuiThemeProvider theme={defaultTheme}>
          <MainLayout />
        </MuiThemeProvider>
      </ThemeProvider>
    </NoSsr>
  );
}

export default App;
