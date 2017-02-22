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

        -r | --run )
            shift
            EL_CMD_RUN=$1

            source ${DIR_CMD}/run.sh
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
