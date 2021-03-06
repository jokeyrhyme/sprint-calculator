'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';

// local modules

import AbsenceInput from '../AbsenceInput';
import DateInput from '../DateInput';
import ListInput from '../ListInput';
import NumberInput from '../NumberInput';
import TextInput from '../TextInput';

import {
  setSprintID, setSprintStartDate, setSprintWeekHours, setSprintWeeks,
  addSprintAbsence, removeSprintAbsence, setSprintAbsence,
  addSprintMember, removeSprintMember, setSprintMember,
  setSprintCompletedPoints
} from '../../lib/actions';

// this module

class Sprint extends Component {
  constructor (props) {
    super(props);

    this.state = { sprint: props.sprint.toJS() };

    this.handleIDChange = this.handleIDChange.bind(this);
    this.handleStartDateChange = this.handleStartDateChange.bind(this);
    this.handleWeekHoursChange = this.handleWeekHoursChange.bind(this);
    this.handleWeeksChange = this.handleWeeksChange.bind(this);

    this.handleAbsenceAdd = this.handleAbsenceAdd.bind(this);
    this.handleAbsenceChange = this.handleAbsenceChange.bind(this);
    this.handleAbsenceRemove = this.handleAbsenceRemove.bind(this);

    this.handleMemberAdd = this.handleMemberAdd.bind(this);
    this.handleMemberChange = this.handleMemberChange.bind(this);
    this.handleMemberRemove = this.handleMemberRemove.bind(this);

    this.handleCompletedChange = this.handleCompletedChange.bind(this);
  }

  componentWillReceiveProps (nextProps) {
    this.setState({ sprint: nextProps.sprint.toJS() });
  }

  shouldComponentUpdate (nextProps, nextState) {
    return nextProps.sprint !== this.props.sprint;
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

  handleAbsenceAdd ({ reason, hours }) {
    const { dispatch, index } = this.props;
    dispatch(addSprintAbsence(index, reason, hours));
  }
  handleAbsenceChange (absenceIndex, { reason, hours }) {
    const { dispatch, index } = this.props;
    dispatch(setSprintAbsence(index, absenceIndex, reason, hours));
  }
  handleAbsenceRemove (absenceIndex) {
    const { dispatch, index } = this.props;
    dispatch(removeSprintAbsence(index, absenceIndex));
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

  handleCompletedChange (number) {
    const { dispatch, index } = this.props;
    dispatch(setSprintCompletedPoints(index, number));
  }

  render () {
    let {
      endDate
    } = this.state.sprint;
    const {
      startDate,
      absences, team,
      averageHoursPerPoint, personHoursPerWeek, id, weeksPerSprint
    } = this.state.sprint;
    const { available, maximum } = this.state.sprint.teamHoursPerSprint;
    const { completed, recommended } = this.state.sprint.points;
    endDate = endDate.toISOString().split('T')[0];

    const teamProps = {
      EntryInput: TextInput,
      onAdd: this.handleMemberAdd,
      onChange: this.handleMemberChange,
      onRemove: this.handleMemberRemove,
      values: team
    };

    const absencesProps = {
      EntryInput: AbsenceInput,
      onAdd: this.handleAbsenceAdd,
      onChange: this.handleAbsenceChange,
      onRemove: this.handleAbsenceRemove,
      values: absences
    };

    return (
      <article className='Sprint'>
        <header className='Sprint__Header'>
          <h1 className='Sprint__Id'>
            <NumberInput className='Sprint__IdInput' value={id} onChange={this.handleIDChange} />
          </h1>
          <div className='Sprint__Dates'>
            <span className='Sprint__StartDate'>
              <DateInput className='Sprint__StartDateInput' value={startDate} onChange={this.handleStartDateChange} />
            </span>
            <span className='Sprint__EndDate'>
              &rarr; <time>{endDate}</time>
            </span>
          </div>
        </header>

        <div className='Sprint__Parameters'>
          <fieldset className='Sprint__Parameter'>
            <label className='Sprint__ParameterLabel'>weeks per sprint</label>
            <NumberInput className='Sprint__ParameterInput' value={weeksPerSprint} onChange={this.handleWeeksChange} />
          </fieldset>

          <fieldset className='Sprint__Parameter'>
            <label className='Sprint__ParameterLabel'>work hours per person per week</label>
            <NumberInput className='Sprint__ParameterInput' value={personHoursPerWeek} onChange={this.handleWeekHoursChange} />
          </fieldset>
        </div>

        <div className='Sprint__TeamData'>
          <dl>
            <dt>team members</dt>
            <dd><ListInput {...teamProps} /></dd>
          </dl>

          <dl>
            <dt>absences</dt>
            <dd><ListInput {...absencesProps} /></dd>
          </dl>
        </div>

        <div className='Sprint__Calculations'>
          <dl>
            <dt>capacity</dt>
            <dd>
              <dl>
                <dt>maximum hours (before absences)</dt><dd>{maximum}</dd>
                <dt>available hours</dt><dd>{available}</dd>
              </dl>
            </dd>
          </dl>

          <dl>
            <dt>commitment points</dt>
            <dd>
              <dl>
                <dt>recommended</dt>
                <dd>{recommended}</dd>

                <dt>completed</dt>
                <dd><NumberInput value={completed} onChange={this.handleCompletedChange} /></dd>
              </dl>
            </dd>
          </dl>

          <dl>
            <dt>average hours per point </dt>
            <dd>{averageHoursPerPoint}</dd>
          </dl>
        </div>
      </article>
    );
  }
}

Sprint.propTypes = {
  dispatch: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  sprint: PropTypes.instanceOf(Map).isRequired
};
Sprint.defaultProps = {
  sprint: new Map()
};

export default Sprint;
