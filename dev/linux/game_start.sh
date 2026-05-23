#!/usr/bin/env bash
BASEDIR=$(dirname "$0")

$BASEDIR/check_dependencies.sh
docker compose -p viewer-cani8 -f $BASEDIR/../../misc/docker-compose.start.yml up -d --remove-orphans --force-recreate --build;
