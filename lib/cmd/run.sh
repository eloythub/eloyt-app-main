#!/usr/bin/env bash

if [ "${EL_CMD_RUN}" = "ios" ];
then
    react-native run-ios --device
else
    adb shell pm uninstall com.eloyt && \
        react-native run-android
fi
