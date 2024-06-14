import React, {Suspense} from 'react';
import ReactDOM from 'react-dom';
import * as Sentry from "@sentry/react";
import { BrowserTracing } from "@sentry/tracing";
import App from './App';
import store from './reducers';
import {Provider} from 'react-redux';
 

ReactDOM.render(
  <Suspense fallback={<h1>Loading...</h1>}>
  <Provider store={store}>
    <App />
  </Provider>,
  </Suspense>,
  document.getElementById('root'));
