'use strict';

/**
@param {Object} keyedReducers - mapping of top-level properties to sub-reducers
@param {Function[]} reducers - reducers that are provided the complete state
@returns {Function} - new reducer that combines all provided reducers
*/
export default function (keyedReducers = {}, ...reducers) {
  return function (state = new Map(), action) {
    let result = state;

    // run reducers that are specific to top-level keys
    result = Object.keys(keyedReducers).reduce((prev, key) => {
      const reducer = keyedReducers[key];
      return prev.set(key, reducer(prev.get(key), action));
    }, result);

    // run reducers that access the complete state
    result = reducers.reduce((prev, reducer) => {
      return reducer(prev, action);
    }, result);

    return result;
  };
}
