#!/bin/sh
FOLDER_GAME_DOGS6_PATH=packages/allgame

export game_id=all
export GAME_ID=ALL
node ./scripts/create_indexjs.js $FOLDER_GAME_DOGS6_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_DOGS6_PATH/src/index.js

cd $FOLDER_GAME_DOGS6_PATH
rm -rf dist
cp -r dist_template/partners/default dist
cp -rf dist_template/partners/$V_VIEWER_ALL_PARTNER/* dist/
webpack --config webpack/config.dist.js