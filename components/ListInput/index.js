'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import List from '../List';

// this module

class ListInput extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    const props = {
      className: 'ListInput',
      isOrdered: this.props.isOrdered
    };
    return (
      <List {...props}>
        {this.renderEntries()}
        {this.props.EntryInput && this.renderAddEntry()}
      </List>
    );
  }

  renderEntries () {
    return this.props.values.map((value, index) => {
      const props = {
        className: 'ListInput__Remove',
        onClick: () => { this.props.onRemove(index); },
        title: 'remove'
      };
      const EntryInput = this.props.EntryInput;
      const entryProps = {
        onChange: (nextValue) => { this.props.onChange(index, nextValue); },
        value
      };
      return (
        <li className='ListInput__Entry' key={index}>
          { EntryInput ? <span><EntryInput {...entryProps} /></span> : <span>{value}</span> }
          <button {...props}>&times;</button>
        </li>
      );
    });
  }

  renderAddEntry () {
    const props = {
      className: 'ListInput__Add',
      onClick: () => {
        this.props.onAdd(this.state.newEntry);
        this.setState({ newEntry: null });
      }
    };
    const EntryInput = this.props.EntryInput;
    const entryProps = {
      onChange: (value) => { this.setState({ newEntry: value }); },
      value: this.state.newEntry
    };
    return (
      <li className='ListInput__Entry'>
        <span><EntryInput {...entryProps} /></span>
        <button {...props} title='add'>+</button>
      </li>
    );
  }
}

ListInput.propTypes = {
  EntryInput: PropTypes.func,
  onAdd: PropTypes.func,
  onChange: PropTypes.func,
  onRemove: PropTypes.func,
  isOrdered: PropTypes.bool,
  values: PropTypes.array.isRequired
};
ListInput.defaultProps = {
  isOrdered: false,
  values: []
};

export default ListInput;
