'use strict';

// foreign modules

import classNames from 'classnames';
import React, { Component, PropTypes } from 'react';

// this module

class List extends Component {
  render () {
    const { children, className, isOrdered } = this.props;
    const props = {
      className: classNames('List', [
        `List--${isOrdered ? '' : 'un'}ordered`
      ], className)
    };
    return isOrdered ? <ol {...props}>{children}</ol> : <ul {...props}>{children}</ul>;
  }
}

List.propTypes = {
  className: PropTypes.string,
  isOrdered: PropTypes.bool
};
List.defaultProps = {
  className: '',
  isOrdered: false
};

export default List;
