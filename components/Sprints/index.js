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
    const { dispatch } = this.props;
    return (
      <div>
        <ul className='Sprints'>
          { this.props.sprints.map((sprint, index) => {
            return (
              <li key={index}>
                <Sprint index={index} dispatch={dispatch} sprint={sprint} onChange={(path, value) => {
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
  dispatch: PropTypes.func.isRequired,
  onSprintChange: PropTypes.func.isRequired,
  sprints: PropTypes.array
};
Sprints.defaultProps = {
  sprints: []
};

export default Sprints;
