'use strict';

// foreign modules

import { connect } from 'react-redux';
import React, { Component, PropTypes } from 'react';

// this module

class App extends Component {
  constructor (props) {
    super(props);
  }

  render () {
    return (
      <main>
        <h1>{this.props.ui.text}</h1>
      </main>
    );
  }
}

App.propTypes = {
  ui: PropTypes.shape({
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
