#!/bin/sh
FOLDER_GAME_DOGS6_PATH=packages/dogs6
FOLDER_GAME_HORSES6_LAZY_PATH=packages/horses6-lazy
FOLDER_GAME_HORSES6_PATH=$FOLDER_GAME_HORSES6_LAZY_PATH/tmp

./scripts/game_horses6_build.sh
export game_id=horses6
export GAME_ID=HORSES6
game_id=HORSES6 node ./scripts/create_indexjs.js $FOLDER_GAME_DOGS6_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_HORSES6_PATH/src/index.js

rm -rf $FOLDER_GAME_HORSES6_LAZY_PATH/dist
rm -rf $FOLDER_GAME_HORSES6_PATH/dist
cp -r $FOLDER_GAME_HORSES6_PATH/dist_template/partners/default $FOLDER_GAME_HORSES6_PATH/dist
cp -rf $FOLDER_GAME_HORSES6_PATH/dist_template/partners/$V_VIEWER_HORSES6_PARTNER/* $FOLDER_GAME_HORSES6_PATH/dist/


cd $FOLDER_GAME_HORSES6_PATH; webpack --config webpack/config.dist.js

# moving tmp/dist to dist
# to be exposed to the
# root dist.sh
mv dist ../dist
