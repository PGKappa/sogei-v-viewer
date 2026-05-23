#!/bin/sh
FOLDER_GAME_DOGS6_PATH=packages/dogs6
FOLDER_GAME_DOGS8_LAZY_PATH=packages/dogs8-lazy
FOLDER_GAME_DOGS8_PATH=$FOLDER_GAME_DOGS8_LAZY_PATH/tmp

./scripts/game_dogs8_build.sh
export game_id=dogs8
export GAME_ID=DOGS8
node ./scripts/create_indexjs.js $FOLDER_GAME_DOGS6_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_DOGS8_PATH/src/index.js

rm -rf $FOLDER_GAME_DOGS8_LAZY_PATH/dist
rm -rf $FOLDER_GAME_DOGS8_PATH/dist
cp -r $FOLDER_GAME_DOGS8_PATH/dist_template/partners/default $FOLDER_GAME_DOGS8_PATH/dist
cp -rf $FOLDER_GAME_DOGS8_PATH/dist_template/partners/$V_VIEWER_DOGS8_PARTNER/* $FOLDER_GAME_DOGS8_PATH/dist/

cd $FOLDER_GAME_DOGS8_PATH; webpack --config webpack/config.dist.js

# moving tmp/dist to dist
# to be exposed to the
# root dist.sh
mv dist ../dist
