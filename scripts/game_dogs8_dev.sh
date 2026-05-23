#!/bin/sh
FOLDER_GAME_DOGS8_LAZY_PATH=packages/dogs8-lazy
FOLDER_GAME_DOGS8_PATH=$FOLDER_GAME_DOGS8_LAZY_PATH/tmp

./scripts/game_dogs8_build.sh
node ./scripts/create_indexjs.js $FOLDER_GAME_DOGS8_LAZY_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_DOGS8_PATH/src/index.js
cd $FOLDER_GAME_DOGS8_LAZY_PATH; webpack-dev-server --config webpack/config.dev.js --host 0.0.0.0 --port 8090 --progress