'use strict';

// foreign modules

import { applyMiddleware, createStore } from 'redux';
import createLogger from 'redux-logger';
import thunkMiddleware from 'redux-thunk';

import { default as rootReducer } from './reducers';

// this module

const LOGGER = createLogger();

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware,
  LOGGER
)(createStore);

export default function configureStore (initialState) {
  return createStoreWithMiddleware(rootReducer, initialState);
}
