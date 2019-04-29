import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { IdleQueue } from 'idlize/IdleQueue.mjs';
import configureStore from 'redux/store';
import { fromJS } from 'immutable';

import App from 'components/App';

const appRoot = document.getElementById('app-root');
const appState = localStorage.getItem('app-state');
const initialState = appState ? fromJS(JSON.parse(appState)) : undefined;
const store = configureStore(initialState);

const queue = new IdleQueue({
  ensureTasksRun: true,
});

store.subscribe(() => {
  queue.clearPendingTasks();
  queue.pushTask(() => {
    const state = store
      .getState()
      .set('currentTodo', { id: null, text: '', isComplete: false });

    const jsonData = JSON.stringify(state.toJS());
    localStorage.setItem('app-state', jsonData);
  });
});

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
