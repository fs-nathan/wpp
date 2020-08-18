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
import { makeStyles } from '@material-ui/core/styles';
import MainLayout from './layouts/MainLayout';
const useStyles = makeStyles({
  success: { backgroundColor: '#00bd66' },
});
function App() {
  const notistackRef = React.createRef();
  const _colors = useSelector(state => state.setting.colors);
  const colors = get(_colors.find(item => item.selected === true), 'color', '#48bb78');
  const classes = useStyles();
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right', }}
            disableWindowBlurListener
            autoHideDuration={30000}
            dense
            classes={{
              variantSuccess: classes.success
            }}
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
