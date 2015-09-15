'use strict';

// foreign modules

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

// local modules

import {
  importData,
  removeSprintAbsence
} from '../../lib/actions';
import RawData from '../../components/RawData';
import Sprints from '../../components/Sprints';

// this module

class App extends Component {
  constructor (props) {
    super(props);

    this.handleImportClick = this.handleImportClick.bind(this);
    this.handleSprintChange = this.handleSprintChange.bind(this);
  }

  handleImportClick (value) {
    this.props.dispatch(importData(value));
  }

  handleSprintChange ([index, prop], ...values) {
    if (prop === 'absences') {
      this.props.dispatch(removeSprintAbsence(index, ...values));
      return;
    }
    global.console.log(new Error(`"${prop}" has no mapped action`));
  }

  render () {
    const { dispatch, sprints } = this.props;
    return (
      <main>
        <Sprints dispatch={dispatch} sprints={sprints} onSprintChange={this.handleSprintChange} />
        <RawData data={this.props.ui.rawData} onImportClick={this.handleImportClick} />
      </main>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sprints: PropTypes.arrayOf(PropTypes.object),
  ui: PropTypes.shape({
    rawData: PropTypes.string
  })
};
App.defaultProps = {};

/**
provide a state suitable for use here
@private
@param {Map} state - current
@returns {Object} exported from Immutable Map
*/
function mapStateToProps (state) {
  return state.toJS();
}

export default connect(mapStateToProps)(App);
