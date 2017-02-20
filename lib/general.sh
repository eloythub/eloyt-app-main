#!/usr/bin/env bash

#
#   File contains the basic methods that needs to be used by other shell files
#

function log {
    STATUS=$1
    MSG=$2

    if [ ! -t 0 ]; then
        INPUT=$(cat)
    else
        INPUT=""
    fi

    case "$STATUS" in
        warning) COLOR_CODE='33'; ;;
        success) COLOR_CODE='32'; ;;
        error)   COLOR_CODE='31'; ;;
        info)    COLOR_CODE='96'; ;;
        *)       COLOR_CODE='39'; MSG=$1 ;;
    esac

    RESET="\e[0m";
    COLOR="\e[0;${COLOR_CODE}m";

    if [[ "$OSTYPE" == "darwin"* ]]; then
        RESET="\x1B[0m";
        COLOR="\x1B[0;${COLOR_CODE}m";
    fi

    echo -e ${COLOR}${MSG}${INPUT}${RESET}
}

function debug {
    if [ -z ${VERBOSE+x} ]; then
       return;
    fi

    log info "Debug: $1";
}

function die {
    log error "Error: $1" 1>&2;
    if [ -f "${ERROR_TMP}" ]; then
        cat ${ERROR_TMP} | log error 1>&2;
    fi
    exit 1;
}
