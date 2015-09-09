'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import DateInput from '../DateInput';
import NumberInput from '../NumberInput';

// this module

class Sprint extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let {
      endDate
    } = this.props.sprint;
    const {
      startDate,
      absences, team,
      averageHoursPerPoint, personHoursPerWeek, sprint, weeksPerSprint
    } = this.props.sprint;
    const { available, maximum } = this.props.sprint.teamHoursPerSprint;
    const { completed, recommended } = this.props.sprint.points;
    endDate = endDate.toISOString().split('T')[0];
    return (
      <div className='Sprint'>
        <h1>#<NumberInput value={sprint} /></h1>
        <DateInput value={startDate} /> &rarr; <time>{endDate}</time>
        <dl>
          <dt>length</dt>
          <dd><NumberInput value={weeksPerSprint} /> week(s)</dd>

          <dt>team size</dt>
          <dd><NumberInput value={team.length} /></dd>

          <dt>work week</dt>
          <dd><NumberInput value={personHoursPerWeek} /> hours</dd>

          <dt>capacity</dt>
          <dd>
            <dl>
              <dt>maximum</dt><dd>{maximum}</dd>
              <dt>available</dt><dd>{available}</dd>
            </dl>
          </dd>

          <dt>absences</dt>
          <dd>{absences.length}</dd>

          <dt>points</dt>
          <dd>
            <dl>
              <dt>recommended</dt>
              <dd>{recommended}</dd>

              <dt>completed</dt>
              <dd><NumberInput value={completed} /></dd>
            </dl>
          </dd>

          <dt>average hours per point </dt>
          <dd>{averageHoursPerPoint}</dd>
        </dl>
      </div>
    );
  }
}

Sprint.propTypes = {
  sprint: PropTypes.shape({
    sprint: PropTypes.number,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    weeksPerSprint: PropTypes.number,
    team: PropTypes.arrayOf(PropTypes.string),
    personHoursPerWeek: PropTypes.number,
    teamHoursPerSprint: PropTypes.shape({
      available: PropTypes.number,
      maximum: PropTypes.number
    }),
    absences: PropTypes.arrayOf(
      PropTypes.shape({
        reason: PropTypes.string,
        hours: PropTypes.number
      })
    ),
    points: PropTypes.shape({
      completed: PropTypes.number,
      recommended: PropTypes.number
    }),
    averageHoursPerPoint: PropTypes.number
  })
};
Sprint.defaultProps = {};

export default Sprint;
