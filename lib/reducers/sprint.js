'use strict';

// foreign modules

import { Map } from 'immutable';

// local modules

import {
  RECALC_SPRINT_AVERAGE, RECALC_SPRINT_ENDDATE, RECALC_SPRINT_TEAMHOURS,
  ADD_SPRINT_ABSENCE, REMOVE_SPRINT_ABSENCE, SET_SPRINT_ABSENCE,
  ADD_SPRINT_MEMBER, REMOVE_SPRINT_MEMBER, SET_SPRINT_MEMBER,
  SET_SPRINT_ID, SET_SPRINT_STARTDATE, SET_SPRINT_WEEKHOURS, SET_SPRINT_WEEKS,
  SET_SPRINT_COMPLETED
} from '../actions';
import { WEEK_MS } from '../values/units';

// this module

export default function reduceSprint (state = new Map(), action) {
  if (action.type === SET_SPRINT_ID) {
    const { id } = action.payload;
    return state.set('id', id);
  }
  if (action.type === SET_SPRINT_COMPLETED) {
    const { number } = action.payload;
    return state.setIn(['points', 'completed'], number);
  }
  if (action.type === SET_SPRINT_WEEKHOURS) {
    const { hours } = action.payload;
    return state.setIn(['personHoursPerWeek'], hours);
  }
  if (action.type === SET_SPRINT_WEEKS) {
    const { weeks } = action.payload;
    return state.set('weeksPerSprint', weeks);
  }
  if (action.type === SET_SPRINT_STARTDATE) {
    const { date } = action.payload;
    return state.set('startDate', date);
  }

  if (action.type === ADD_SPRINT_ABSENCE) {
    const { reason, hours } = action.payload;
    return state.set('absences', state.get('absences').push(new Map({ reason, hours })));
  }
  if (action.type === REMOVE_SPRINT_ABSENCE) {
    const { absenceIndex } = action.payload;
    return state.deleteIn(['absences', absenceIndex]);
  }
  if (action.type === SET_SPRINT_ABSENCE) {
    const { absenceIndex, reason, hours } = action.payload;
    return state.setIn(['absences', absenceIndex], new Map({ reason, hours }));
  }

  if (action.type === ADD_SPRINT_MEMBER) {
    const { name } = action.payload;
    return state.set('team', state.get('team').push(name));
  }
  if (action.type === REMOVE_SPRINT_MEMBER) {
    const { memberIndex } = action.payload;
    return state.deleteIn(['team', memberIndex]);
  }
  if (action.type === SET_SPRINT_MEMBER) {
    const { memberIndex, name } = action.payload;
    return state.setIn(['team', memberIndex], name);
  }

  if (action.type === RECALC_SPRINT_AVERAGE) {
    const available = state.getIn(['teamHoursPerSprint', 'available']);
    const completed = state.getIn(['points', 'completed']);
    return state.withMutations((map) => {
      map.set('averageHoursPerPoint', available / completed);
    });
  }
  if (action.type === RECALC_SPRINT_ENDDATE) {
    const startDate = state.get('startDate');
    const weeks = state.get('weeksPerSprint');
    return state.withMutations((map) => {
      map.set('endDate', new Date(startDate.valueOf() + weeks * WEEK_MS));
    });
  }
  if (action.type === RECALC_SPRINT_TEAMHOURS) {
    const sprintWeeks = state.get('weeksPerSprint');
    const teamSize = state.get('team').size;
    const weekHours = state.get('personHoursPerWeek');
    const absences = state.get('absences').reduce((total, absence) => {
      return total + absence.get('hours');
    }, 0);
    const maximum = sprintWeeks * teamSize * weekHours;
    return state.withMutations((map) => {
      map.setIn(['teamHoursPerSprint', 'available'], maximum - absences);
      map.setIn(['teamHoursPerSprint', 'maximum'], maximum);
    });
  }

  return state;
}
