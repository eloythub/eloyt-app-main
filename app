#!/usr/bin/env bash

clear

source ./lib/general.sh

ROOT="$(pwd)"
DIR_LIB="${ROOT}/lib"
DIR_CMD="${DIR_LIB}/cmd"

log "info" "ELOYT ROCKS !!!"

cd Eloyt ?> /dev/null

while [ "$1" != "" ]; do
    case $1 in
        -s | --start )
            source ${DIR_CMD}/start.sh
            exit
            ;;

        -a | --adb )
            shift

            if [ -z ${1} ]
            then
                EL_PARAM_ADB_PORT=8081
            else
                EL_PARAM_ADB_PORT=$1
            fi

            source ${DIR_CMD}/adb-watch.sh
            exit
            ;;

        -R | --remove )
            shift

            if [ -z ${1} ]
            then
                EL_PARAM_ANDROID_REMOVE_APP_BUNDLE="com.eloyt"
            else
                EL_PARAM_ANDROID_REMOVE_APP_BUNDLE=$1
            fi

            source ${DIR_CMD}/adb-remove.sh
            ;;

        -r | --run )
            shift
            EL_CMD_RUN=$1

            source ${DIR_CMD}/run.sh
            ;;

        -re | --release )
            shift
            EL_CMD_RUN=$1

            source ${DIR_CMD}/release.sh
            ;;

        -t | --test )
            shift

            source ${DIR_CMD}/test.sh
            ;;

        -c | --cleanup )
            shift

            source ${DIR_CMD}/cleanup.sh
            ;;

        -h | --help )
            cat ${DIR_LIB}/app-usage.txt
            exit 1
            ;;

        *)
            log "error" "Wrong Param..."
            cat ${DIR_LIB}/app-usage.txt
            exit 1
            ;;
    esac
    shift
done

cd - ?> /dev/null
