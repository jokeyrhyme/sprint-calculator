'use strict';

// local modules

import {
  IMPORT_DATA
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
