import { createStore } from 'redux';

import reducers from './reducer';

export default function configureStore(initialState) {
  const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

  const enhancers = [
    process.env.NODE_ENV !== 'production' &&
      __REDUX_DEVTOOLS_EXTENSION__ &&
      __REDUX_DEVTOOLS_EXTENSION__(),
  ];

  return createStore(reducers, initialState, ...enhancers);
}
