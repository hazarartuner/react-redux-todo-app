import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux/store';

import App from 'components/App';

const appRoot = document.getElementById('app-root');
const store = configureStore();

render(
  <Provider store={store}>
    <App />
  </Provider>,
  appRoot,
);

if (module.hot) {
  module.hot.accept('components/App', () => {
    const HotApp = require('components/App/index.js').default; // eslint-disable-line global-require

    render(
      <Provider store={store}>
        <HotApp />
      </Provider>,
      appRoot,
    );
  });
}
