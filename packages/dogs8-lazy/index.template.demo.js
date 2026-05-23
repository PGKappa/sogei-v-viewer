import './components/styles/main.scss';
import "./partners/${partner}/main.scss";

import {params, config, init, storage} from '@v-viewer/core';

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

var intrval;
setTimeout(() => {
	init();	
	setTimeout(() => {
		clearInterval(intrval);
	}, 3000);

	intrval = setInterval(() => {
		storage.countdown = 80;
		storage.timeCountdownWasSet = +new Date();	
	}, 20);
}, 100);

/*
import axios from 'axios';
axios.post(`http://192.168.1.42:8000/api/session/generate`, {
	operator: 'stanleybet',
	username: 'test6'
}).then(x => {
	window.init_code = x.data.token;
	config({
		initializePages,
		webfontConfig,
		pageDelegates,
		storage: data
	});

	init();
});
*/



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
