'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

class TextInput extends Component {
  constructor (props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleChange (event) {
    if (this.props.onChange) {
      this.props.onChange(React.findDOMNode(this.refs.input).value);
    }
  }

  handleKeyPress (event) {
    if (event.key === 'Enter' && this.props.onEnterKey) {
      this.props.onEnterKey();
    }
  }

  render () {
    const props = {
      ref: 'input',
      onChange: this.handleChange,
      onKeyPress: this.handleKeyPress,
      type: 'text',
      value: this.props.value
    };
    return (
      <input {...props} />
    );
  }
}

TextInput.propTypes = {
  onEnterKey: PropTypes.func,
  onChange: PropTypes.func,
  value: PropTypes.string
};
TextInput.defaultProps = {
  value: ''
};

export default TextInput;
