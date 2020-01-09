import React from 'react';
import { ThemeProvider } from 'styled-components';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import MainLayout from './layouts/MainLayout';
import { SnackbarProvider } from 'notistack';
import CloseIcon from '@material-ui/icons/Close';
import SnackbarHandler from './components/SnackbarHandler';
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
  const notistackRef = React.createRef();
  const onClickDismiss = key => () => { 
    notistackRef.current.closeSnackbar(key);
  }

  return (
    <NoSsr>
      <ThemeProvider theme={defaultTheme}>
        <MuiThemeProvider theme={defaultTheme}>
          <SnackbarProvider 
            ref={notistackRef}
            action={(key) => (
              <IconButton color="inherit" onClick={onClickDismiss(key)}>
                <CloseIcon />
              </IconButton>
            )}
            maxSnack={8}
            anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            disableWindowBlurListener
            autoHideDuration={3000}
            dense
          >
            <SnackbarHandler>
              <MainLayout />
            </SnackbarHandler>
          </SnackbarProvider>
        </MuiThemeProvider>
      </ThemeProvider>
    </NoSsr>
  );
}

export default App;
