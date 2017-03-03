#!/usr/bin/env bash

# --configuration release  --device

if [ "${EL_CMD_RUN}" = "ios" ];
then
    react-native run-ios
else
    react-native run-android
fi
