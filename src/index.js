import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import { StylesProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';
import store from './configStore';

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <StylesProvider injectFirst>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </StylesProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
