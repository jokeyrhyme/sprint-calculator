'use strict';

// local modules

import { SET_TEXT } from './values/actions';

// this module

export function setText (text = '') {
  return {
    type: SET_TEXT,
    payload: {
      text
    }
  };
}
