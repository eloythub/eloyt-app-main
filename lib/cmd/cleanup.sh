#!/usr/bin/env bash

watchman watch-del-all 
rm -rf node_modules
rm -rf yarn.lock 
rm -rf $TMPDIR/react-packager-*
rm -rf ios/build
npm cache clear
yarn
react-native link
