#!/bin/sh
FOLDER_GAME_DOGS6_PATH=packages/dogs6
FOLDER_GAME_TROTTING6_LAZY_PATH=packages/trotting6-lazy
FOLDER_GAME_TROTTING6_PATH=$FOLDER_GAME_TROTTING6_LAZY_PATH/tmp

./scripts/game_trotting6_build.sh
node ./scripts/create_indexjs.js $FOLDER_GAME_TROTTING6_LAZY_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_TROTTING6_PATH/src/index.js $GAME_ENV_PATH
cd $FOLDER_GAME_TROTTING6_LAZY_PATH; webpack-dev-server --config webpack/config.dev.js --host 0.0.0.0 --port 8090 --progress