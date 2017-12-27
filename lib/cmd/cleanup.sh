#!/usr/bin/env bash

watchman watch-del-all 1>/dev/null
rm -rf node_modules 1>/dev/null
rm -rf yarn.lock  1>/dev/null
rm -rf package-lock.json 1>/dev/null
rm -rf $TMPDIR/react-packager-* 1>/dev/null
rm -rf ios/build 1>/dev/null
npm cache clear --force -s 1>/dev/null
npm cache verify 1>/dev/null

yarn

react-native link

cat ../lib/Subscribable.js > ./node_modules/react-native/Libraries/Components/Subscribable.js
