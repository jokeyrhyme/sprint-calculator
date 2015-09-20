'use strict';

// foreign modules

import { fromJS, List, Map } from 'immutable';

// local modules

import {
  IMPORT_DATA,
  CREATE_SPRINT,
  RECALC_SPRINT_ENDDATE, RECALC_SPRINT_TEAMHOURS,
  ADD_SPRINT_ABSENCE, REMOVE_SPRINT_ABSENCE, SET_SPRINT_ABSENCE,
  ADD_SPRINT_MEMBER, REMOVE_SPRINT_MEMBER, SET_SPRINT_MEMBER,
  SET_SPRINT_ID, SET_SPRINT_STARTDATE, SET_SPRINT_WEEKHOURS, SET_SPRINT_WEEKS
} from './values/actions';
import { WEEK_MS } from './values/units';
import { blankSprint } from './initialState';
import combineReducers from '../utils/combineReducers';
import { toDateString } from '../utils/helpers';

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
  if (action.type === SET_SPRINT_ID) {
    const { index, id } = action.payload;
    return state.setIn([index, 'id'], id);
  }
  if (action.type === SET_SPRINT_WEEKHOURS) {
    const { index, hours } = action.payload;
    return state.setIn([index, 'personHoursPerWeek'], hours);
  }
  if (action.type === SET_SPRINT_WEEKS) {
    const { index, weeks } = action.payload;
    return state.setIn([index, 'weeksPerSprint'], weeks);
  }
  if (action.type === SET_SPRINT_STARTDATE) {
    const { index, date } = action.payload;
    return state.setIn([index, 'startDate'], date);
  }

  if (action.type === ADD_SPRINT_ABSENCE) {
    const { index, reason, hours } = action.payload;
    return state.update(index, (sprint) => {
      return sprint.set('absences', sprint.get('absences').push(new Map({ reason, hours })));
    });
  }
  if (action.type === REMOVE_SPRINT_ABSENCE) {
    const { index, absenceIndex } = action.payload;
    return state.update(index, (sprint) => {
      return sprint.deleteIn(['absences', absenceIndex]);
    });
  }
  if (action.type === SET_SPRINT_ABSENCE) {
    const { index, absenceIndex, reason, hours } = action.payload;
    return state.update(index, (sprint) => {
      return sprint.setIn(['absences', absenceIndex], new Map({ reason, hours }));
    });
  }

  if (action.type === ADD_SPRINT_MEMBER) {
    const { index, name } = action.payload;
    return state.update(index, (sprint) => {
      return sprint.set('team', sprint.get('team').push(name));
    });
  }
  if (action.type === REMOVE_SPRINT_MEMBER) {
    const { index, memberIndex } = action.payload;
    return state.update(index, (sprint) => {
      return sprint.deleteIn(['team', memberIndex]);
    });
  }
  if (action.type === SET_SPRINT_MEMBER) {
    const { index, memberIndex, name } = action.payload;
    return state.update(index, (sprint) => {
      return sprint.setIn(['team', memberIndex], name);
    });
  }

  if (action.type === RECALC_SPRINT_ENDDATE) {
    const { index } = action.payload;
    return state.update(index, (sprint) => {
      const startDate = sprint.get('startDate');
      const weeks = sprint.get('weeksPerSprint');
      return sprint.withMutations((map) => {
        map.set('endDate', new Date(startDate.valueOf() + weeks * WEEK_MS));
      });
    });
  }
  if (action.type === RECALC_SPRINT_TEAMHOURS) {
    const { index } = action.payload;
    return state.update(index, (sprint) => {
      const sprintWeeks = sprint.get('weeksPerSprint');
      const teamSize = sprint.get('team').size;
      const weekHours = sprint.get('personHoursPerWeek');
      const absences = sprint.get('absences').reduce((total, absence) => {
        return total + absence.get('hours');
      }, 0);
      const maximum = sprintWeeks * teamSize * weekHours;
      return sprint.withMutations((map) => {
        map.setIn(['teamHoursPerSprint', 'available'], maximum - absences);
        map.setIn(['teamHoursPerSprint', 'maximum'], maximum);
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
