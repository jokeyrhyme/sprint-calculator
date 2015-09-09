'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

class NumberInput extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <input type='number' value={this.props.value} />
    );
  }
}

NumberInput.propTypes = {
  value: PropTypes.number.isRequired
};
NumberInput.defaultProps = {
  value: 0
};

export default NumberInput;
