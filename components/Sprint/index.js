'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import DateInput from '../DateInput';
import ListInput from '../ListInput';
import NumberInput from '../NumberInput';
import TextInput from '../TextInput';

import {
  setSprintID, setSprintStartDate, setSprintWeekHours, setSprintWeeks,
  addSprintMember, removeSprintMember, setSprintMember
} from '../../lib/actions';

// this module

class Sprint extends Component {
  constructor (props) {
    super(props);

    this.handleIDChange = this.handleIDChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleWeekHoursChange = this.handleWeekHoursChange.bind(this);
    this.handleWeeksChange = this.handleWeeksChange.bind(this);

    this.handleAbsenceRemove = this.handleAbsenceRemove.bind(this);
    this.handleMemberAdd = this.handleMemberAdd.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleMemberRemove = this.handleMemberRemove.bind(this);
  }

  handleIDChange (id) {
    const { dispatch, index } = this.props;
    dispatch(setSprintID(index, id));
  }

  handleStartDateChange (date) {
    const { dispatch, index } = this.props;
    dispatch(setSprintStartDate(index, date));
  }

  handleWeekHoursChange (hours) {
    const { dispatch, index } = this.props;
    dispatch(setSprintWeekHours(index, hours));
  }

  handleWeeksChange (weeks) {
    const { dispatch, index } = this.props;
    dispatch(setSprintWeeks(index, weeks));
  }

  handleAbsenceRemove (index) {
    const { reason, hours } = this.props.sprint.absences[index];
    this.props.onChange(['absences'], reason, hours);
  }

  handleMemberAdd (name) {
    const { dispatch, index } = this.props;
    dispatch(addSprintMember(index, name));
  }
  handleMemberChange (memberIndex, name) {
    const { dispatch, index } = this.props;
    dispatch(setSprintMember(index, memberIndex, name));
  }
  handleMemberRemove (memberIndex) {
    const { dispatch, index } = this.props;
    dispatch(removeSprintMember(index, memberIndex));
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

    const teamProps = {
      EntryInput: TextInput,
      onAdd: this.handleMemberAdd,
      onChange: this.handleMemberChange,
      onRemove: this.handleMemberRemove,
      values: team
    };

    return (
      <div className='Sprint'>
        <h1>#<NumberInput value={id} onChange={this.handleIDChange} /></h1>
        <DateInput value={startDate} onChange={this.handleStartDateChange} /> &rarr; <time>{endDate}</time>
        <dl>
          <dt>length</dt>
          <dd><NumberInput value={weeksPerSprint} onChange={this.handleWeeksChange} /> week(s)</dd>

          <dt>team size</dt>
          <dd><ListInput {...teamProps} /></dd>

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
          <dd><ListInput values={absences} onRemove={this.handleAbsenceRemove} /></dd>

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
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
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
