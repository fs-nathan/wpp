import IconButton from '@material-ui/core/IconButton';
import NoSsr from '@material-ui/core/NoSsr';
import { createMuiTheme, darken, lighten, MuiThemeProvider } from '@material-ui/core/styles';
import CloseIcon from '@material-ui/icons/Close';
import { get } from 'lodash';
import { SnackbarProvider } from 'notistack';
import React from 'react';
import { useSelector } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import './App.scss';
import SnackbarHandler from './components/SnackbarHandler';
import MainLayout from './layouts/MainLayout';

/*
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
*/

function App() {
  const notistackRef = React.createRef();
  const _colors = useSelector(state => state.setting.colors);
  const colors = get(_colors.find(item => item.selected === true), 'color', '#48bb78');

  const defaultTheme = React.useMemo(() => createMuiTheme({
    palette: {
      primary: {
        main: colors,
        light: lighten(colors, 0.2),
        dark: darken(colors, 0.2),
      },
      secondary: {
        main: '#fd7e14',
        light: lighten('#fd7e14', 0.2),
        dark: darken('#fd7e14', 0.2),
      }
    }
  }), [colors]);

  console.log(colors);

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
            autoHideDuration={20000}
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
