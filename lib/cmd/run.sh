#!/usr/bin/env bash

# --configuration release  --device
#
if [ "${EL_CMD_RUN}" = "ios" ];
then
    react-native run-ios
else
    adb shell pm uninstall com.eloyt && \
        react-native run-android
fi

# RELEASE MODE
#if [ "${EL_CMD_RUN}" = "ios" ];
#then
#    react-native run-ios --configuration release  --device
#else
#    adb shell pm uninstall com.eloyt && \
#        react-native run-android --variant=release
#fi
