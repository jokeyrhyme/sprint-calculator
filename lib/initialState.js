'use strict';

// foreign modules

import { fromJS } from 'immutable';

// this module

export const blankSprint = {
  id: 0,
  startDate: new Date(),
  endDate: new Date(),
  weeksPerSprint: 2,
  team: [],
  personHoursPerWeek: 40,
  teamHoursPerSprint: {
    available: 0,
    maximum: 0
  },
  absences: [],
  points: {
    completed: 0,
    recommended: 0
  },
  averageHoursPerPoint: 0
};

const state = {
  sprints: [
    blankSprint
  ],
  ui: {
    rawData: ''
  }
};

export default fromJS(state);
