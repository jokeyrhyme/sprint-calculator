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

export const RECALC_SPRINT_RECOMMENDED = 'RECALC_SPRINT_RECOMMENDED';
export function recalcSprintRecommended (sprintIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: RECALC_SPRINT_RECOMMENDED,
      payload: {
        sprintIndex
      }
    });

    const state = getState();
    const nextSprintIndex = sprintIndex + 1;
    if (nextSprintIndex < state.get('sprints').size) {
      dispatch(recalcSprintRecommended(nextSprintIndex));
    }
  };
}

export const RECALC_SPRINT_AVERAGE = 'RECALC_SPRINT_AVERAGE';
export function recalcSprintAverage (sprintIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: RECALC_SPRINT_AVERAGE,
      payload: {
        sprintIndex
      }
    });

    const state = getState();
    const nextSprintIndex = sprintIndex + 1;
    if (nextSprintIndex < state.get('sprints').size) {
      dispatch(recalcSprintRecommended(nextSprintIndex));
    }
  };
}

export const RECALC_SPRINT_ENDDATE = 'RECALC_SPRINT_ENDDATE';
export function recalcSprintEndDate (sprintIndex) {
  return {
    type: RECALC_SPRINT_ENDDATE,
    payload: {
      sprintIndex
    }
  };
}

export const RECALC_SPRINT_TEAMHOURS = 'RECALC_SPRINT_TEAMHOURS';
export function recalcSprintTeamHours (sprintIndex) {
  return (dispatch, getState) => {
    dispatch({
      type: RECALC_SPRINT_TEAMHOURS,
      payload: {
        sprintIndex
      }
    });
    dispatch(recalcSprintAverage(sprintIndex));
    dispatch(recalcSprintRecommended(sprintIndex));
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
    dispatch(recalcSprintTeamHours(createdIndex));
    dispatch(recalcSprintRecommended(createdIndex));
  };
}

export const DELETE_SPRINT = 'DELETE_SPRINT';
export function deleteSprint (sprintIndex) {
  return {
    type: DELETE_SPRINT,
    payload: {
      sprintIndex
    }
  };
}

export const SET_SPRINT_ID = 'SET_SPRINT_ID';
export function setSprintID (sprintIndex, id) {
  return {
    type: SET_SPRINT_ID,
    payload: {
      sprintIndex,
      id
    }
  };
}

export const SET_SPRINT_STARTDATE = 'SET_SPRINT_STARTDATE';
export function setSprintStartDate (sprintIndex, date) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_STARTDATE,
      payload: {
        sprintIndex,
        date
      }
    });
    dispatch(recalcSprintEndDate(sprintIndex));
  };
}

export const SET_SPRINT_WEEKHOURS = 'SET_SPRINT_WEEKHOURS';
export function setSprintWeekHours (sprintIndex, hours) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_WEEKHOURS,
      payload: {
        sprintIndex,
        hours
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const SET_SPRINT_WEEKS = 'SET_SPRINT_WEEKS';
export function setSprintWeeks (sprintIndex, weeks) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_WEEKS,
      payload: {
        sprintIndex,
        weeks
      }
    });
    dispatch(recalcSprintEndDate(sprintIndex));
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const SET_SPRINT_COMPLETED = 'SET_SPRINT_COMPLETED';
export function setSprintCompletedPoints (sprintIndex, number) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_COMPLETED,
      payload: {
        sprintIndex,
        number
      }
    });
    dispatch(recalcSprintAverage(sprintIndex));
  };
}

export const ADD_SPRINT_MEMBER = 'ADD_SPRINT_MEMBER';
export function addSprintMember (sprintIndex, name) {
  return (dispatch) => {
    dispatch({
      type: ADD_SPRINT_MEMBER,
      payload: {
        sprintIndex,
        name
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const REMOVE_SPRINT_MEMBER = 'REMOVE_SPRINT_MEMBER';
export function removeSprintMember (sprintIndex, memberIndex) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SPRINT_MEMBER,
      payload: {
        sprintIndex,
        memberIndex
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const SET_SPRINT_MEMBER = 'SET_SPRINT_MEMBER';
export function setSprintMember (sprintIndex, memberIndex, name) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_MEMBER,
      payload: {
        sprintIndex,
        memberIndex,
        name
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const ADD_SPRINT_ABSENCE = 'ADD_SPRINT_ABSENCE';
export function addSprintAbsence (sprintIndex, reason, hours) {
  return (dispatch) => {
    dispatch({
      type: ADD_SPRINT_ABSENCE,
      payload: {
        hours,
        sprintIndex,
        reason
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const REMOVE_SPRINT_ABSENCE = 'REMOVE_SPRINT_ABSENCE';
export function removeSprintAbsence (sprintIndex, absenceIndex) {
  return (dispatch) => {
    dispatch({
      type: REMOVE_SPRINT_ABSENCE,
      payload: {
        sprintIndex,
        absenceIndex
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}

export const SET_SPRINT_ABSENCE = 'SET_SPRINT_ABSENCE';
export function setSprintAbsence (sprintIndex, absenceIndex, reason, hours) {
  return (dispatch) => {
    dispatch({
      type: SET_SPRINT_ABSENCE,
      payload: {
        hours,
        sprintIndex,
        absenceIndex,
        reason
      }
    });
    dispatch(recalcSprintTeamHours(sprintIndex));
  };
}
