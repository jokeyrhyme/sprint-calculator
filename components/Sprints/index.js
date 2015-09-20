'use strict';

// foreign modules

import React, { Component, PropTypes } from 'react';

// local modules

import Sprint from '../Sprint';
import { createSprint } from '../../lib/actions';

// this module

class Sprints extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    const { dispatch } = this.props;
    const newProps = {
      onClick: () => {
        this.props.dispatch(createSprint());
      }
    };
    return (
      <div>
        <button {...newProps}>new sprint</button>
        <ul className='Sprints'>
          { this.props.sprints.reverse().map((sprint, index) => {
            const reverseIndex = this.props.sprints.length - index - 1;
            return (
              <li key={reverseIndex}>
                <Sprint index={reverseIndex} dispatch={dispatch} sprint={sprint} />
              </li>
            );
          }) }
        </ul>
      </div>
    );
  }
}

Sprints.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sprints: PropTypes.array
};
Sprints.defaultProps = {
  sprints: []
};

export default Sprints;
