import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'normalize.css';
import * as serviceWorker from './serviceWorker';
import { StylesProvider } from '@material-ui/styles';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer, { DEFAULT_STATE } from './reducers';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './sagas';
import { I18nextProvider } from 'react-i18next';
import i18n from './i18n';

const sagaMiddleware = createSagaMiddleware();
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  DEFAULT_STATE,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
sagaMiddleware.run(rootSaga);

ReactDOM.render(
  <I18nextProvider i18n={i18n}>
    <Provider store={store}>
      <StylesProvider injectFirst>       
        <Suspense>
          <App />
        </Suspense> 
      </StylesProvider>
    </Provider>
  </I18nextProvider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
