import React from 'react';
import { render } from 'react-dom';
import App from 'components/App';

render(<App />, document.getElementById("app"));

if (module.hot) {
  module.hot.accept('components/App', () => {
    const App = require('components/App/index.js').default;

    render(<App />, document.getElementById("app"));
  });
}