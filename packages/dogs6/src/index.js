import './components/styles/main.scss';
import "./partners/sogei/main.scss";

import {params, config, init, storage} from '@v-viewer/core';

import {getGameOptions} from './options';

const gameOptions = getGameOptions(params.GUI_LAYOUT_VERSION);

config({
	initializePages: gameOptions.initializePages,
	webfontConfig: gameOptions.webfontConfig,
	pageDelegates: gameOptions.pageDelegates,
	storage: gameOptions.data,
	getParams: ['show_tag_real']
});

document.body.classList[gameOptions.data.global.show_tag_real ? 'add' : 'remove']('show-tag-real');


var intrval;
setTimeout(() => {
	init();	
	setTimeout(() => {
		clearInterval(intrval);
	}, 3000);

	intrval = setInterval(() => {
		storage.countdown = 91;
		storage.timeCountdownWasSet = +new Date();	
	}, 20);
}, 100);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
