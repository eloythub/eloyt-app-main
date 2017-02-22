#!/usr/bin/env bash

function adb_get_device_id () {
    DEVICE_ID=$(adb devices | grep -o '\b[a-f0-9]\+\b');
}

function adb_shell () {
    echo $(adb shell 'echo 1' 2> /dev/null);
}

function adb_reverse () {
    log "info" "${DEVICE_ID} reverse tcp:${1}"
    adb -s ${DEVICE_ID} reverse tcp:${1} tcp:${1} 1> /dev/null 2> /dev/null
}

function adb_watch () {
    while [ $(adb_shell) ]; do sleep 2; done

    log "error" "ADB has been restarted"

    adb kill-server 1> /dev/null 2> /dev/null
    adb start-server 1> /dev/null 2> /dev/null

    adb_reverse 8090

    adb_reverse ${EL_PARAM_ADB_PORT}
}

adb_get_device_id

adb start-server 1> /dev/null

log "success" "ADB Started Device: [${DEVICE_ID}]"

while [ true ]; do adb_watch ; done
