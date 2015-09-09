'use strict';

// foreign modules

import { fromJS } from 'immutable';

// this module

const state = {
  sprints: [
    {
      sprint: 0,
      startDate: new Date(),
      endDate: new Date(),
      weeksPerSprint: 2,
      team: [''],
      personHoursPerWeek: 40,
      teamHoursPerSprint: {
        available: 0,
        maximum: 0
      },
      absences: [
        {
          reason: '',
          hours: 0
        }
      ],
      points: {
        completed: 0,
        recommended: 0
      },
      averageHoursPerPoint: 0
    }
  ],
  ui: {
    rawData: ''
  }
};

export default fromJS(state);
