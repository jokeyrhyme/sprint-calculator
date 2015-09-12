'use strict';

// foreign modules

import { fromJS, List, Map } from 'immutable';

// local modules

import {
  IMPORT_DATA,
  SET_SPRINT_ID, SET_SPRINT_STARTDATE, SET_SPRINT_WEEKS,
  UPDATE_SPRINT_ENDDATE
} from './values/actions';
import { WEEK_MS } from './values/units';
import combineReducers from '../utils/combineReducers';
import { toDateString } from '../utils/helpers';

// this module

function sprints (state = new List(), action) {
  if (action.type === SET_SPRINT_ID) {
    const { index, id } = action.payload;
    return state.setIn([index, 'id'], id);
  }
  if (action.type === SET_SPRINT_WEEKS) {
    const { index, weeks } = action.payload;
    return state.setIn([index, 'weeksPerSprint'], weeks);
  }
  if (action.type === SET_SPRINT_STARTDATE) {
    const { index, date } = action.payload;
    return state.setIn([index, 'startDate'], date);
  }
  if (action.type === UPDATE_SPRINT_ENDDATE) {
    const { index } = action.payload;
    return state.update(index, (sprint) => {
      const startDate = sprint.get('startDate');
      const weeks = sprint.get('weeksPerSprint');
      return sprint.withMutations((map) => {
        map.set('endDate', new Date(startDate.valueOf() + weeks * WEEK_MS));
      });
    });
  }
  return state;
}

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
    imported.sprints.forEach((sprint) => {
      sprint.endDate = new Date(sprint.endDate);
      sprint.startDate = new Date(sprint.startDate);
    });
    return fromJS(imported).set('ui', state.get('ui'));
  }
  const snapshot = state.delete('ui').toJS();
  snapshot.sprints.forEach((sprint) => {
    sprint.endDate = toDateString(sprint.endDate);
    sprint.startDate = toDateString(sprint.startDate);
  });
  return state.setIn(['ui', 'rawData'], JSON.stringify(snapshot));
}

const rootReducer = combineReducers({
  sprints,
  ui
}, rawData);

export default rootReducer;
