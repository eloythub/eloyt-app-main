#!/usr/bin/env bash

# --configuration release

if [ "${EL_CMD_RUN}" = "ios" ];
then
    react-native run-ios --device
else
    react-native run-android
fi
