'use strict';

// this module

export const IMPORT_DATA = 'IMPORT_DATA';
export function importData (json = '') {
  return {
    type: IMPORT_DATA,
    payload: {
      json
    }
  };
}

export const RECALC_SPRINT_ENDDATE = 'RECALC_SPRINT_ENDDATE';
export function recalcSprintEndDate (index) {
  return {
    type: RECALC_SPRINT_ENDDATE,
    payload: {
      index
    }
  };
}

export const RECALC_SPRINT_TEAMHOURS = 'RECALC_SPRINT_TEAMHOURS';
export function recalcSprintTeamHours (index) {
  return {
    type: RECALC_SPRINT_TEAMHOURS,
    payload: {
      index
    }
  };
}

export const CREATE_SPRINT = 'CREATE_SPRINT';
export function createSprint () {
  return (dispatch, getState) => {
    dispatch({
      type: CREATE_SPRINT,
      payload: {}
    });

    const state = getState();
    const createdIndex = state.get('sprints').size - 1;
    dispatch(recalcSprintEndDate(createdIndex));
  };
}

export const DELETE_SPRINT = 'DELETE_SPRINT';
export function deleteSprint (index) {
  return {
    type: DELETE_SPRINT,
    payload: {
      index
    }
  };
}

export const SET_SPRINT_ID = 'SET_SPRINT_ID';
export function setSprintID (index, id) {
  return {
    type: SET_SPRINT_ID,
    payload: {
      index,
      id
    }
  };
}

export const SET_SPRINT_STARTDATE = 'SET_SPRINT_STARTDATE';
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

export const SET_SPRINT_WEEKHOURS = 'SET_SPRINT_WEEKHOURS';
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

export const SET_SPRINT_WEEKS = 'SET_SPRINT_WEEKS';
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

export const SET_SPRINT_COMPLETED = 'SET_SPRINT_COMPLETED';
export function setSprintCompletedPoints (index, number) {
  return {
    type: SET_SPRINT_COMPLETED,
    payload: {
      index,
      number
    }
  };
}

export const ADD_SPRINT_MEMBER = 'ADD_SPRINT_MEMBER';
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

export const REMOVE_SPRINT_MEMBER = 'REMOVE_SPRINT_MEMBER';
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

export const SET_SPRINT_MEMBER = 'SET_SPRINT_MEMBER';
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

export const ADD_SPRINT_ABSENCE = 'ADD_SPRINT_ABSENCE';
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

export const REMOVE_SPRINT_ABSENCE = 'REMOVE_SPRINT_ABSENCE';
export function removeSprintAbsence (index, absenceIndex) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SPRINT_ABSENCE,
      payload: {
        index,
        absenceIndex
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}

export const SET_SPRINT_ABSENCE = 'SET_SPRINT_ABSENCE';
export function setSprintAbsence (index, absenceIndex, reason, hours) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_ABSENCE,
      payload: {
        hours,
        index,
        absenceIndex,
        reason
      }
    });
    dispatch(recalcSprintTeamHours(index));
  };
}
