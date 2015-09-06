'use strict';

// local modules

import {
  IMPORT_DATA,
  SET_TEXT
} from './values/actions';

// this module

export function importData (json = '') {
  return {
    type: IMPORT_DATA,
    payload: {
      json
    }
  };
}

export function setText (text = '') {
  return {
    type: SET_TEXT,
    payload: {
      text
    }
  };
}
