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
    const { className, value } = this.props;
    const props = {
      className,
      ref: 'input',
      onChange: this.handleChange,
      type: 'date',
      value: toDateString(value)
    };
    return (
      <input {...props} />
    );
  }
}

DateInput.propTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  value: PropTypes.instanceOf(Date).isRequired
};
DateInput.defaultProps = {
  className: '',
  value: new Date()
};

export default DateInput;
