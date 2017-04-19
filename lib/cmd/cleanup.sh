#!/usr/bin/env bash

rm -rf node_modules/ && \
    rm -rf yarn.lock && \
    npm cache clear && \
    watchman watch-del-all && \
    rm -rf $TMPDIR/react-packager-* && \
    rm -rf ios/build/ && \
    yarn && \
    react-native link
