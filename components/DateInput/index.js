'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import { toDateString } from '../../utils/helpers';

// this module

class DateInput extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <input type='date' value={toDateString(this.props.value)} />
    );
  }
}

DateInput.propTypes = {
  value: PropTypes.instanceOf(Date).isRequired
};
DateInput.defaultProps = {
  value: new Date()
};

export default DateInput;
