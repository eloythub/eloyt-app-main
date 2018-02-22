#!/usr/bin/env bash

if [ "${EL_CMD_RUN}" = "ios" ];
then
    yarn ios ${EL_CMD_RUN_ARG}
else
    yarn android
fi
