'use strict';

// foreign modules

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';
import { Map } from 'immutable';

// local modules

import { importData } from '../../lib/actions';
import RawData from '../../components/RawData';
import Sprints from '../../components/Sprints';

// this module

class App extends Component {
  constructor (props) {
    super(props);

    this.handleImportClick = this.handleImportClick.bind(this);
  }

  handleImportClick (value) {
    this.props.dispatch(importData(value));
  }

  render () {
    const { dispatch, sprints } = this.props;
    return (
      <main>
        <header>
          <h1>Sprint Calculator</h1>
        </header>
        <Sprints dispatch={dispatch} sprints={sprints} />
        <RawData data={this.props.ui.rawData} onImportClick={this.handleImportClick} />
        <footer>
          <a href='https://github.com/jokeyrhyme/sprint-calculator'>GitHub</a>
        </footer>
      </main>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sprints: PropTypes.arrayOf(PropTypes.instanceOf(Map)),
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
  return {
    sprints: state.get('sprints').toArray(),
    ui: state.get('ui').toJS()
  };
}

export default connect(mapStateToProps)(App);
