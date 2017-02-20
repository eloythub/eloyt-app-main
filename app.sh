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

        -r | --run )
            shift
            EL_CMD_RUN=$1

            source ${DIR_CMD}/run.sh
            ;;

        -h | --help )
            cat lib/app-usage.txt
            exit 1
            ;;

        *)
            log "error" "Wrong Param..."
            cat lib/app-usage.txt
            exit 1
            ;;
    esac
    shift
done

cd - ?> /dev/null
