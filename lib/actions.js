'use strict';

// local modules

import {
  IMPORT_DATA,
  CREATE_SPRINT, DELETE_SPRINT,
  SET_SPRINT_NUMBER, SET_SPRINT_STARTDATE, SET_SPRINT_WEEKS, SET_SPRINT_COMPLETED,
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

export function setSprintNumber (index, number) {
  return {
    type: SET_SPRINT_NUMBER,
    payload: {
      index,
      number
    }
  };
}

export function setSprintStartDate (index, date) {
  return {
    type: SET_SPRINT_STARTDATE,
    payload: {
      index,
      date
    }
  };
}

export function setSprintWeeks (index, number) {
  return {
    type: SET_SPRINT_WEEKS,
    payload: {
      index,
      number
    }
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

export function addSprintMember (name) {
  return {
    type: ADD_SPRINT_MEMBER,
    payload: {
      name
    }
  };
}

export function removeSprintMember (name) {
  return {
    type: REMOVE_SPRINT_MEMBER,
    payload: {
      name
    }
  };
}

export function addSprintAbsence (reason, hours) {
  return {
    type: ADD_SPRINT_ABSENCE,
    payload: {
      hours,
      reason
    }
  };
}

export function removeSprintAbsence (reason, hours) {
  return {
    type: REMOVE_SPRINT_ABSENCE,
    payload: {
      hours,
      reason
    }
  };
}
