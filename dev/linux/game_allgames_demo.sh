#!/usr/bin/env bash
BASEDIR=$(dirname "$0")
export game_id=allgames;
export GAME_ID=ALLGAMES;

docker-compose -f $BASEDIR/../../misc/docker-compose.demo.yml up --remove-orphans --force-recreate --build;