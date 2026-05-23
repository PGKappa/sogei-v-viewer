import {data, webfontConfig, pageDelegates, initializePages} from './options-test';

import {config, init} from '../src/v-index.js';

config({
	initializePages,
	webfontConfig,
	pageDelegates,
	storage: data
});

init();