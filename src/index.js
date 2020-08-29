import { jssPreset, StylesProvider } from '@material-ui/core/styles';
import { create } from 'jss';
import "normalize.css";
import React from "react";
import ReactDOM from "react-dom";
import { I18nextProvider } from "react-i18next";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import store from "./configStore";
import i18n from "./i18n";
import * as serviceWorker from './serviceWorker';
import App from "./App";

const styleNode = document.createComment('jss-insertion-point');
document.head.insertBefore(styleNode, document.head.firstChild);
const jss = create({
  ...jssPreset(),
  // Define a custom insertion point that JSS will look for when injecting the styles into the DOM.
  insertionPoint: 'jss-insertion-point',
});
ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <StylesProvider jss={jss}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </StylesProvider>
    </Provider>
  </I18nextProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

serviceWorker.register();
