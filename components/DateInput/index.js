'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import { toDateString } from '../../utils/helpers';

// this module

class DateInput extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(React.findDOMNode(this.refs.input).valueAsDate);
    }
  }

  render () {
    const props = {
      ref: 'input',
      onChange: this.handleChange,
      type: 'date',
      value: toDateString(this.props.value)
    };
    return (
      <input {...props} />
    );
  }
}

DateInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date).isRequired
};
DateInput.defaultProps = {
  value: new Date()
};

export default DateInput;
