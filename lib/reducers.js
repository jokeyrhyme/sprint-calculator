'use strict';

// foreign modules

import { fromJS, Map } from 'immutable';

// local modules

import { IMPORT_DATA, SET_TEXT } from './values/actions';
import combineReducers from '../utils/combineReducers';

// this module

function ui (state = new Map(), action) {
  if (action.type === SET_TEXT) {
    return state.set('text', action.payload.text);
  }
  return state;
}

function rawData (state = new Map(), action) {
  if (action.type === IMPORT_DATA) {
    let imported;
    try {
      imported = JSON.parse(action.payload.json);
    } catch (err) {
      global.console.error(err);
      return state;
    }
    return fromJS(imported);
  }
  const snapshot = state.delete('ui').toJS();
  return state.setIn(['ui', 'rawData'], JSON.stringify(snapshot));
}

const rootReducer = combineReducers({
  ui
}, rawData);

export default rootReducer;
