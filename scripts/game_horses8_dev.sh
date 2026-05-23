FOLDER_GAME_HORSES8_LAZY_PATH=packages/horses8-lazy
FOLDER_GAME_HORSES8_PATH=$FOLDER_GAME_HORSES8_LAZY_PATH/tmp

./scripts/game_horses8_build.sh
node ./scripts/create_indexjs.js $FOLDER_GAME_HORSES8_LAZY_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_HORSES8_PATH/src/index.js
cd $FOLDER_GAME_HORSES8_LAZY_PATH; webpack-dev-server --config webpack/config.dev.js --host 0.0.0.0 --port 8090 --progress