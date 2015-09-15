'use strict';

// local modules

import {
  IMPORT_DATA,
  RECALC_SPRINT_ENDDATE, RECALC_SPRINT_TEAMHOURS,
  CREATE_SPRINT, DELETE_SPRINT,
  SET_SPRINT_ID, SET_SPRINT_STARTDATE,
  SET_SPRINT_WEEKHOURS, SET_SPRINT_WEEKS, SET_SPRINT_COMPLETED,
  ADD_SPRINT_MEMBER, REMOVE_SPRINT_MEMBER, SET_SPRINT_MEMBER,
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

export function recalcSprintEndDate (index) {
  return {
    type: RECALC_SPRINT_ENDDATE,
    payload: {
      index
    }
  };
}

export function recalcSprintTeamHours (index) {
  return {
    type: RECALC_SPRINT_TEAMHOURS,
    payload: {
      index
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

export function setSprintStartDate (index, date) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_STARTDATE,
      payload: {
        index,
        date
      }
    });
    dispatch(recalcSprintEndDate(index));
  };
}

export function setSprintWeekHours (index, hours) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_WEEKHOURS,
      payload: {
        index,
        hours
      }
    });
    dispatch(recalcSprintTeamHours(index));
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
    dispatch(recalcSprintEndDate(index));
    dispatch(recalcSprintTeamHours(index));
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
  return (dispatch) => {
    dispatch({
      type: ADD_SPRINT_MEMBER,
      payload: {
        index,
        name
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}

export function removeSprintMember (index, memberIndex) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SPRINT_MEMBER,
      payload: {
        index,
        memberIndex
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}

export function setSprintMember (index, memberIndex, name) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_MEMBER,
      payload: {
        index,
        memberIndex,
        name
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}

export function addSprintAbsence (index, reason, hours) {
  return (dispatch) => {
    dispatch({
      type: ADD_SPRINT_ABSENCE,
      payload: {
        hours,
        index,
        reason
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}

export function removeSprintAbsence (index, reason, hours) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SPRINT_ABSENCE,
      payload: {
        hours,
        index,
        reason
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}
