'use strict';

// foreign modules

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

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
    return (
      <main>
        <h1>{this.props.ui.text}</h1>
        <Sprints sprints={this.props.sprints} />
        <RawData data={this.props.ui.rawData} onImportClick={this.handleImportClick} />
      </main>
    );
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  sprints: PropTypes.arrayOf(PropTypes.object),
  ui: PropTypes.shape({
    rawData: PropTypes.string,
    text: PropTypes.string
  })
};
App.defaultProps = {};

/**
provide a state suitable for use here
@private
*/
function mapStateToProps (state) {
  return state.toJS();
}

export default connect(mapStateToProps)(App);
