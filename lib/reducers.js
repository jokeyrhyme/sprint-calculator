'use strict';

// foreign modules

import { fromJS, Map } from 'immutable';

// local modules

import { IMPORT_DATA } from './values/actions';
import combineReducers from '../utils/combineReducers';

// this module

function ui (state = new Map(), action) {
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
    return fromJS(imported).setIn(['ui', 'rawData'], JSON.stringify(imported));
  }
  const snapshot = state.delete('ui').toJS();
  return state.setIn(['ui', 'rawData'], JSON.stringify(snapshot));
}

const rootReducer = combineReducers({
  ui
}, rawData);

export default rootReducer;
