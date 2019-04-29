import { createStore } from 'redux';

import reducers from './reducer';

export default function configureStore(initialState) {
  const { __REDUX_DEVTOOLS_EXTENSION__ } = window;
  const enhancers = [];

  if (process.env.NODE_ENV !== 'production' && __REDUX_DEVTOOLS_EXTENSION__) {
    enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
  }

  return createStore(reducers, initialState, ...enhancers);
}
