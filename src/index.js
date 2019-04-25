import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';

render(<App />, document.getElementById('app'));

if (module.hot) {
  module.hot.accept('components/App', () => {
    const HotApp = require('components/App/index.js').default; // eslint-disable-line global-require

    render(<HotApp />, document.getElementById('app'));
  });
}
