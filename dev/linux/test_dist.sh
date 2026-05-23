#!/usr/bin/env bash
BASEDIR=$(dirname "$0")

docker-compose -f $BASEDIR/../../misc/docker-compose.test.dist.yml up --remove-orphans --force-recreate --build;