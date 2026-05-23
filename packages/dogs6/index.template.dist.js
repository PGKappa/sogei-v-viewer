import './components/styles/main.scss';
import "./partners/${partner}/main.scss";

import {params, config, init} from '@v-viewer/core';

import {getGameOptions} from './options';
//import {data, webfontConfig, pageDelegates, initializePages} 


const gameOptions = getGameOptions(params.GUI_LAYOUT_VERSION);



config({
	initializePages: gameOptions.initializePages,
	webfontConfig: gameOptions.webfontConfig,
	pageDelegates: gameOptions.pageDelegates,
	storage: gameOptions.data,
	getParams: ['show_tag_real']
});

document.body.classList[gameOptions.data.global.show_tag_real ? 'add' : 'remove']('show-tag-real');
init();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
