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

    this.handleIDChange = this.handleIDChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleWeekHoursChange = this.handleWeekHoursChange.bind(this);
    this.handleWeeksChange = this.handleWeeksChange.bind(this);
  }

  handleIDChange (id) {
    this.props.onChange(['id'], id);
  }

  handleStartDateChange (date) {
    this.props.onChange(['startDate'], date);
  }

  handleWeekHoursChange (hours) {
    this.props.onChange(['personHoursPerWeek'], hours);
  }

  handleWeeksChange (weeks) {
    this.props.onChange(['weeksPerSprint'], weeks);
  }

  render () {
    let {
      endDate
    } = this.props.sprint;
    const {
      startDate,
      absences, team,
      averageHoursPerPoint, personHoursPerWeek, id, weeksPerSprint
    } = this.props.sprint;
    const { available, maximum } = this.props.sprint.teamHoursPerSprint;
    const { completed, recommended } = this.props.sprint.points;
    endDate = endDate.toISOString().split('T')[0];

    return (
      <div className='Sprint'>
        <h1>#<NumberInput value={id} onChange={this.handleIDChange} /></h1>
        <DateInput value={startDate} onChange={this.handleStartDateChange} /> &rarr; <time>{endDate}</time>
        <dl>
          <dt>length</dt>
          <dd><NumberInput value={weeksPerSprint} onChange={this.handleWeeksChange} /> week(s)</dd>

          <dt>team size</dt>
          <dd><NumberInput value={team.length} /></dd>

          <dt>work week</dt>
          <dd><NumberInput value={personHoursPerWeek} onChange={this.handleWeekHoursChange} /> hours</dd>

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
  onChange: PropTypes.func.isRequired,
  sprint: PropTypes.shape({
    id: PropTypes.number,
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
