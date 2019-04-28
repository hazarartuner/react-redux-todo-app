import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';

const appRoot = document.getElementById('app-root');

render(<App />, appRoot);

if (module.hot) {
  module.hot.accept('components/App', () => {
    const HotApp = require('components/App/index.js').default; // eslint-disable-line global-require

    render(<HotApp />, appRoot);
  });
}
