'use strict';

// foreign modules

import { Map } from 'immutable';

// local modules

import { SET_TEXT } from './values/actions';
import combineReducers from '../utils/combineReducers';

// this module

function ui (state = new Map(), action) {
  if (action.type === SET_TEXT) {
    return state.set('text', action.payload.text);
  }
  return state;
}

const rootReducer = combineReducers({
  ui
});

export default rootReducer;
