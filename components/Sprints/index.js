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
    return (
      <div>
        <ul>
          { this.props.sprints.map((sprint, index) => {
            return (
              <li key={index}>
                <Sprint sprint={sprint} />
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
  sprints: PropTypes.array
};
Sprints.defaultProps = {
  sprints: []
};

export default Sprints;
