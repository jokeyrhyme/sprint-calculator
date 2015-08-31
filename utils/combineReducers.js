'use strict';

/**
@param {Object} reducers
@returns {Function}
*/
export default function (keyedReducers = {}, ...reducers) {
  return function (state = new Map(), action) {
    let result = state;

    // run reducers that are specific to top-level keys
    result = Object.keys(keyedReducers).reduce((prev, key) => {
      let reducer = keyedReducers[key];
      return prev.set(key, reducer(prev.get(key), action));
    }, result);

    // run reducers that access the complete state
    result = reducers.reduce((prev, reducer) => {
      return reducer(prev, action);
    }, result);

    return result;
  };
}
