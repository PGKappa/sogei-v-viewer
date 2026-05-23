#!/usr/bin/bash
BASEDIR=$(dirname "$0")
export game_id=dogs8;
export GAME_ID=DOGS8;

docker-compose -f $BASEDIR/../../misc/docker-compose.draw.yml up --remove-orphans --force-recreate --build