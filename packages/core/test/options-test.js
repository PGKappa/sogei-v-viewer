const data = {
	pages: [],
};

export { data }

const pages = {
	MAIN: 'main',
	TRIFECTA: 'trifecta',
	VIDEO: 'video',
	RESULTS: 'results',
	COUNTDOWN: 'countdown'
}

export function initializePages() {
	data.pages = [
		{
			id: pages.VIDEO,
			start: 240,
			end: 200
		},
		{
			id: pages.RESULTS,
			start: 199,
			end: 170
		},
		{
			id: pages.MAIN,
			start: 169,
			end: 150
		},
		{
			id: pages.TRIFECTA,
			start: 150,
			end: 0
		}
	]
}

export const webfontConfig = {
	custom: {
		families: ["main_font1"],
		urls: ["./lib/fonts.css"]
	}
}

export const pageDelegates = {
	[pages.MAIN]: onMainOddsTime,
	[pages.TRIFECTA]: onTrifectaOddsTime,
	[pages.VIDEO]: onVideoTime,
	[pages.RESULTS]: onResultTime
};

function onMainOddsTime() {
 	console.log("onMainOddsTime");
}

function onTrifectaOddsTime() {
	console.log("onTrifectaOddsTime");
}

function onVideoTime() {
	console.log("onVideoTime");
}

function onResultTime() {
	console.log("onResultTime");
}