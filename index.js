'use strict';

// foreign modules

import React from 'react';
import WebFont from 'webfontloader';

// local modules

import Root from './containers/root';

// this module

React.render(<Root />, document.body);

WebFont.load({
  google: {
    families: ['Source Code Pro']
  }
});
