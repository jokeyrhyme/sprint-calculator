'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// this module

class RawData extends Component {
  constructor (props) {
    super(props);

    this.state = { value: props.data };
  }

  handleTextChange () {
    this.setState({ value: React.findDOMNode(this.refs.data).value });
  }

  render () {
    let textareaProps = {
      className: 'RawData__Data',
      defaultValue: this.props.data,
      ref: 'data',
      spellCheck: false,
      onChange: this.handleTextChange.bind(this)
    };
    let buttonProps = {
      className: 'RawData__Import',
      onClick: () => {
        this.props.onImportClick(this.state.value);
      }
    };
    return (
      <div className='RawData'>
        <textarea {...textareaProps}></textarea>
        <button {...buttonProps}>import</button>
      </div>
    );
  }

  shouldComponentUpdate (nextProps, nextState) {
    if (nextProps.data !== this.props.data) {
      return true;
    }
    if (nextProps.data !== this.state.value) {
      return true;
    }
    return false; // ignore state changes
  }
}

RawData.propTypes = {
  data: PropTypes.string,
  onImportClick: PropTypes.func
};
RawData.defaultProps = {};

export default RawData;
