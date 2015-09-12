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
    const textareaProps = {
      className: 'RawData__Data',
      onChange: this.handleTextChange.bind(this),
      ref: 'data',
      spellCheck: false,
      value: this.state.value
    };
    const buttonProps = {
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

  componentWillReceiveProps ({ data }) {
    this.setState({ value: data });
  }
}

RawData.propTypes = {
  data: PropTypes.string,
  onImportClick: PropTypes.func
};
RawData.defaultProps = {};

export default RawData;
