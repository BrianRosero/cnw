import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

// project imports
import * as serviceWorker from './serviceWorker';
import App from './App';
import { store } from './redux/Store.jsx';

// style + assets
import './assets/scss/style.scss';
import config from './config';

import { SoftUIControllerProvider } from "./context";

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <BrowserRouter basename={config.basename}>
      <SoftUIControllerProvider>
      <App />
      </SoftUIControllerProvider>
    </BrowserRouter>
  </Provider>,
);

// If you want your app to work offline and load faster, you can chađinge
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
