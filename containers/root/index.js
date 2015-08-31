/* eslint-disable no-console */ // still experimenting, relax!

'use strict';

// foreign modules

import { Provider } from 'react-redux';
import React, { Component } from 'react';

// local modules

import App from '../app';
import { default as configureStore } from '../../lib/configureStore';
import initialState from '../../lib/initialState';
import { setText } from '../../lib/actions';

// this module

const store = configureStore(initialState);

store.dispatch(setText('Hello, world!'));

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
