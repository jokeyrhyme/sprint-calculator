'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

class TextInput extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(React.findDOMNode(this.refs.input).value);
    }
  }

  render () {
    const props = {
      ref: 'input',
      onChange: this.handleChange,
      type: 'text',
      value: this.props.value
    };
    return (
      <input {...props} />
    );
  }
}

TextInput.propTypes = {
  onChange: PropTypes.func,
  value: PropTypes.string
};
TextInput.defaultProps = {
  value: ''
};

export default TextInput;
