'use strict';

// foreign modules

import { fromJS, List, Map } from 'immutable';

// local modules

import {
  IMPORT_DATA, CREATE_SPRINT, RECALC_SPRINT_RECOMMENDED
} from './actions';
import { blankSprint } from './initialState';
import combineReducers from '../utils/combineReducers';
import { toDateString } from '../utils/helpers';
import reduceSprint from './reducers/sprint';

// this module

function sprints (state = new List(), action) {
  if (action.type === CREATE_SPRINT) {
    if (!state.size) {
      return state.push(fromJS(blankSprint));
    }
    const previous = state.get(state.size - 1);
    const sprint = fromJS(blankSprint).withMutations((map) => {
      map.set('absences', previous.get('absences'));
      map.set('id', previous.get('id') + 1);
      map.set('startDate', previous.get('endDate'));
      map.set('personHoursPerWeek', previous.get('personHoursPerWeek'));
      map.set('team', previous.get('team'));
    });
    return state.push(sprint);
  }

  const { sprintIndex } = action.payload || {};

  if (typeof sprintIndex === 'number') {
    const sprint = state.get(sprintIndex);

    if (sprint && sprint instanceof Map) {
      if (action.type === RECALC_SPRINT_RECOMMENDED) {
        const oldSprints = state.slice(Math.max(0, sprintIndex - 5), sprintIndex);
        if (oldSprints.size <= 0) {
          return state.set(sprintIndex, sprint.setIn(['points', 'recommended'], 0));
        }
        return state.set(sprintIndex, sprint.withMutations((map) => {
          const sumOfOldAverages = oldSprints.reduce((reduction, oldSprint) => {
            return reduction + oldSprint.get('averageHoursPerPoint');
          }, 0);
          const rollingAverage = sumOfOldAverages / oldSprints.size;
          const availableHours = map.getIn(['teamHoursPerSprint', 'available']);
          map.setIn(['points', 'recommended'], availableHours / rollingAverage);
        }));
      }

      return state.set(sprintIndex, reduceSprint(sprint, action));
    }
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
