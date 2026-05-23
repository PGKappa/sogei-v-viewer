#!/bin/sh
FOLDER_GAME_DOGS6_PATH=packages/dogs6

export game_id=dogs6
export GAME_ID=DOGS6
node ./scripts/create_indexjs.js $FOLDER_GAME_DOGS6_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_DOGS6_PATH/src/index.js

cd $FOLDER_GAME_DOGS6_PATH
rm -rf dist
cp -r dist_template/partners/default dist
cp -rf dist_template/partners/$V_VIEWER_DOGS6_PARTNER/* dist/
webpack --config webpack/config.dist.js