'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

class AbsenceInput extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange (event) {
    if (this.props.onChange) {
      const reason = React.findDOMNode(this.refs.reason).value;
      const hours = React.findDOMNode(this.refs.hours).valueAsNumber;
      this.props.onChange({ reason, hours });
    }
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' && this.props.onEnterKey) {
      this.props.onEnterKey();
    }
  }

  render () {
    const { reason, hours } = this.props.value || {};
    const reasonProps = {
      className: 'AbsenceInput__Reason',
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress,
      ref: 'reason',
      type: 'text',
      value: reason
    };
    const hoursProps = {
      className: 'AbsenceInput__Hours',
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress,
      ref: 'hours',
      step: 0.1,
      type: 'number',
      value: hours
    };
    return (
      <span className='AbsenceInput'>
        <input {...reasonProps} />
        <input {...hoursProps} />
      </span>
    );
  }
}

AbsenceInput.propTypes = {
  onEnterKey: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.shape({
    reason: PropTypes.string,
    hours: PropTypes.number
  })
};
AbsenceInput.defaultProps = {
  value: {
    reason: '',
    hours: 0
  }
};

export default AbsenceInput;
