'use strict';

// local modules

import {
  IMPORT_DATA,
  CREATE_SPRINT, DELETE_SPRINT,
  SET_SPRINT_ID, SET_SPRINT_STARTDATE, SET_SPRINT_WEEKS, SET_SPRINT_COMPLETED,
  UPDATE_SPRINT_ENDDATE,
  ADD_SPRINT_MEMBER, REMOVE_SPRINT_MEMBER,
  ADD_SPRINT_ABSENCE, REMOVE_SPRINT_ABSENCE
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

export function createSprint () {
  return {
    type: CREATE_SPRINT,
    payload: {}
  };
}

export function deleteSprint (index) {
  return {
    type: DELETE_SPRINT,
    payload: {
      index
    }
  };
}

export function setSprintID (index, id) {
  return {
    type: SET_SPRINT_ID,
    payload: {
      index,
      id
    }
  };
}

export function updateSprintEndDate (index) {
  return {
    type: UPDATE_SPRINT_ENDDATE,
    payload: {
      index
    }
  };
}

export function setSprintStartDate (index, date) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_STARTDATE,
      payload: {
        index,
        date
      }
    });
    dispatch(updateSprintEndDate(index));
  };
}

export function setSprintWeeks (index, weeks) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_WEEKS,
      payload: {
        index,
        weeks
      }
    });
    dispatch(updateSprintEndDate(index));
  };
}

export function setSprintCompletedPoints (index, number) {
  return {
    type: SET_SPRINT_COMPLETED,
    payload: {
      index,
      number
    }
  };
}

export function addSprintMember (index, name) {
  return {
    type: ADD_SPRINT_MEMBER,
    payload: {
      index,
      name
    }
  };
}

export function removeSprintMember (index, name) {
  return {
    type: REMOVE_SPRINT_MEMBER,
    payload: {
      index,
      name
    }
  };
}

export function addSprintAbsence (index, reason, hours) {
  return {
    type: ADD_SPRINT_ABSENCE,
    payload: {
      hours,
      index,
      reason
    }
  };
}

export function removeSprintAbsence (index, reason, hours) {
  return {
    type: REMOVE_SPRINT_ABSENCE,
    payload: {
      hours,
      index,
      reason
    }
  };
}
