'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

function dateToString (value) {
  let date;
  if (typeof value === 'number') {
    date = new Date(value);
  }
  return date.toISOString().split('T')[0];
}

class Sprint extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    let {
      endDate, startDate,
      absences, team,
      averageHoursPerPoint, personHoursPerWeek, sprint, weeksPerSprint
    } = this.props.sprint;
    let { available, maximum } = this.props.sprint.teamHoursPerSprint;
    let { commitment, recommended } = this.props.sprint.points;
    startDate = dateToString(startDate);
    endDate = dateToString(endDate);
    return (
      <div className='Sprint'>
        <h1>#{sprint}</h1>
        <time>{startDate}</time> &rarr; <time>{endDate}</time>
        <dl>
          <dt>length</dt><dd>{weeksPerSprint} week(s)</dd>
          <dt>team size</dt><dd>{team.length}</dd>
          <dt>work week</dt><dd>{personHoursPerWeek} hours</dd>
          <dt>capacity</dt>
          <dd>
            <dl>
              <dt>maximum</dt><dd>{maximum}</dd>
              <dt>available</dt><dd>{available}</dd>
            </dl>
          </dd>
          <dt>absences</dt><dd>{absences.length}</dd>
          <dt>points</dt>
          <dd>
            <dl>
              <dt>recommended</dt><dd>{recommended}</dd>
              <dt>commitment</dt><dd>{commitment}</dd>
            </dl>
          </dd>
          <dt>average hours per point </dt><dd>{averageHoursPerPoint}</dd>
          <dt></dt><dd></dd>
        </dl>
      </div>
    );
  }
}

Sprint.propTypes = {
  sprint: PropTypes.shape({
    sprint: PropTypes.number,
    startDate: PropTypes.number,
    endDate: PropTypes.number,
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
      commitment: PropTypes.number,
      recommended: PropTypes.number
    }),
    averageHoursPerPoint: PropTypes.number
  })
};
Sprint.defaultProps = {};

export default Sprint;
