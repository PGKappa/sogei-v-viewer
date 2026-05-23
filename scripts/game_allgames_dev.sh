FOLDER_GAME_DOGS6_PATH=packages/allgames

node ./scripts/create_indexjs.js $FOLDER_GAME_DOGS6_PATH/$V_VIEWER_INDEX_TEMPLATE $FOLDER_GAME_DOGS6_PATH/src/index.js
cd $FOLDER_GAME_DOGS6_PATH; webpack-dev-server --config webpack/config.dev.js --host 0.0.0.0 --port 8090 --progress