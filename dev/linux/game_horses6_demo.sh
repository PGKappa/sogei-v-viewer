#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
export game_id=horses6;
export GAME_ID=HORSES6;

docker-compose -f $BASEDIR/../../misc/docker-compose.demo.yml up --remove-orphans --force-recreate --build;