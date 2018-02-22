import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import IndexView from 'Eloyt/index.ios.js';

it('App Starts Properly', () => {
  'use strict';
  renderer.create(
    <IndexView />
  );
});
