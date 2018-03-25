import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import configureStore from './store/configureStore';

import 'semantic-ui-css/semantic.min.css';
import './index.css';

const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
