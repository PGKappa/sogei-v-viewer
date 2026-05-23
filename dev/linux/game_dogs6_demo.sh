#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
export game_id=dogs6;
export GAME_ID=DOGS6;

docker-compose -f $BASEDIR/../../misc/docker-compose.demo.yml up --remove-orphans --force-recreate --build;