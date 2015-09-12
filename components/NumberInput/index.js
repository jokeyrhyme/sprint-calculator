'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

class NumberInput extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(React.findDOMNode(this.refs.input).valueAsNumber);
    }
  }

  render () {
    const props = {
      ref: 'input',
      onChange: this.handleChange,
      type: 'number',
      value: this.props.value
    };
    return (
      <input {...props} />
    );
  }
}

NumberInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.number.isRequired
};
NumberInput.defaultProps = {
  value: 0
};

export default NumberInput;
