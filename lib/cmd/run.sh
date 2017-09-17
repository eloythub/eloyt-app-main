#!/usr/bin/env bash

if [ "${EL_CMD_RUN}" = "ios" ];
then
    react-native run-ios ${EL_CMD_RUN_ARG} --simulator="iPhone 7"
else
    adb shell pm uninstall com.eloyt && \
        react-native run-android
fi
