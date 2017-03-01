import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import BootstrapView from 'Eloyt/Js/BootstrapView';

it('App Starts Properly', () => {
  'use strict';
  renderer.create(
    <BootstrapView />
  );
});
