'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import Sprint from '../Sprint';

// this module

class Sprints extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const handleSprintChange = this.props.onSprintChange;
    return (
      <div>
        <ul>
          { this.props.sprints.map((sprint, index) => {
            return (
              <li key={index}>
                <Sprint sprint={sprint} onChange={(path, value) => {
                  handleSprintChange([index].concat(path), value);
                }} />
              </li>
            );
          }) }
        </ul>
        <button>new</button>
      </div>
    );
  }
}

Sprints.propTypes = {
  onSprintChange: PropTypes.func.isRequired,
  sprints: PropTypes.array
};
Sprints.defaultProps = {
  sprints: []
};

export default Sprints;
