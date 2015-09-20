'use strict';

// foreign modules

import { Provider } from 'react-redux';
import React, { Component } from 'react';

// local modules

import App from '../app';
import { default as configureStore } from '../../lib/configureStore';
import initialState from '../../lib/initialState';

// this module

const store = configureStore(initialState);

export default class Root extends Component {
  render () {
    return (
      <Provider store={store}>
        {() => <App />}
      </Provider>
    );
  }
}
