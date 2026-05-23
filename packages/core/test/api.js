const chai = require('chai');
chai.use(require('chai-json-schema'));
const axios = require('axios');
const nock = require('nock');
const mockResponse = require('./mock-response');

const api = require("../src/v-api.js");
const initMock = require("../tmp/apiv3.0_init_viewer.json");

describe("v-api", function() {
	it("axios return", function(done) {
		const expectedResponse = ['ret_code', 'description', 'game_statistics', "timestamp"];

		let axiosResponse = [];
		let callback = (result) => {}

		// let errorCallback = (result) => {
		// 	console.log("y", result)
		// }

		api.config({
			gameIdGetter: () => {
				return 'dogs6'
			},
			channelIdGetter: () => {
				return '2'
			},
			nextPalimpsestIdGetter: () => {
				return '1'
			},
			nextEventIdGetter: () => {
				return 'dogs6'
			}
		});

		api.requestInit((result) => {
			// it('should do great things in life and love', function() {
				expect(result).to.be.jsonSchema(initMock);
				// the `done` callback's first argument is considered an error
				// so the test will fail if `done` receives a truthy first argument
				console.log(result)
				done();
			// });
		}, (error) => {
			// errorCallback
			console.log("error >", error);
			done(error);
		});


		// console.log(test)

		// console.log(axiosResponse);
		// nock(`${api.url}`)
		// 	.get('/extinit')
		// 	.reply(200, mockResponse);
		// 	const date2 = Date.now();
		// 	expect (typeof mockResponse).to.equal('object');
		//   expect (typeof mockResponse.ret_code).to.equal('number');
		//   expect (mockResponse.ret_code).to.equal(171);
		//   expect (typeof mockResponse.description).to.equal('string');
		//   expect (mockResponse.description).to.equal('Too many empty fields on request.');
		//   expect (typeof mockResponse.timestamp).to.equal('string');
		//   expect (mockResponse.timestamp).to.equal(`${date2}+0000`);
	})
});