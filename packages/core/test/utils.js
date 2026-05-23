const utils = require("../src/v-utils");
const chai = require('chai');
const expect = chai.expect;

const desiredMMSS = {
    '-1': '00:00',
    '0': '00:00',
    '59': '00:59',
    '60': '01:00',
    '239': '03:59',
    '240': '04:00',
};

describe("v-utils::String.prototype.toMMSS", function () {
    Object.entries(desiredMMSS).forEach(function ([input, output]) {
        it(`${input} equals to ${output}`, function (done) {
            expect(input.toMMSS()).to.equal(output);
            done();
        });
    });
});