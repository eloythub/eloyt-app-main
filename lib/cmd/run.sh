#!/usr/bin/env bash

if [ "${EL_CMD_RUN}" = "ios" ];
then
    react-native run-ios ${EL_CMD_RUN_ARG}
else
    react-native run-android
fi
