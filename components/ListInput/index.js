'use strict';

// foreign modules

import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

// this module

class ListInput extends Component {
  render () {
    const props = {
      className: classNames('ListInput', [
        `ListInput--${this.props.isOrdered ? '' : 'un'}ordered`
      ])
    };
    if (this.props.isOrdered) {
      return (
        <ol {...props}>
          {this.renderEntries()}
          {this.props.EntryInput && this.renderAddEntry()}
        </ol>
      );
    }
    return (
      <ul {...props}>
        {this.renderEntries()}
        {this.props.EntryInput && this.renderAddEntry()}
      </ul>
    );
  }

  renderEntries () {
    return this.props.values.map((value, index) => {
      const props = {
        className: 'ListInput__Remove',
        onClick: () => { this.props.onRemove(index); },
        title: 'remove'
      };
      return (
        <li className='ListInput__Entry' key={index}>
          {this.renderEntry(value)}
          <button {...props}>&times;</button>
        </li>
      );
    });
  }

  renderEntry (value) {
    const EntryInput = this.props.EntryInput;
    if (EntryInput) {
      return <span><EntryInput value={value} /></span>;
    }
    return <span>{value}</span>;
  }

  renderAddEntry () {
    const props = {
      className: 'ListInput__Add',
      onClick: () => { global.console.log('ListInput~onAddClick():'); }
    };
    return (
      <li>
        {this.renderEntry()}
        <button {...props} title='add'>&plus;</button>
      </li>
    );
  }
}

ListInput.propTypes = {
  EntryInput: PropTypes.func,
  onRemove: PropTypes.func,
  isOrdered: PropTypes.bool,
  values: PropTypes.array.isRequired
};
ListInput.defaultProps = {
  isOrdered: false,
  values: []
};

export default ListInput;
