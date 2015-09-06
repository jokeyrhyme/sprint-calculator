'use strict';

// foreign modules

import { fromJS } from 'immutable';

// this module

let state = {
  sprints: [
    {
      sprint: 0,
      startDate: 0,
      endDate: 0,
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
        commitment: 0,
        recommended: 0
      },
      averageHoursPerPoint: 0
    }
  ],
  ui: {
    rawData: '',
    text: ''
  }
};

export default fromJS(state);
