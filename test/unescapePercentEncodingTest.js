'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {unescapePercentEncoding} = require('../src/util');

const expectedTests = new Map([
    ['%2525252525252525', '%'],
]);

describe('unescapePercentEncoding', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(unescapePercentEncoding(test)).to.equal(expected)
        })
    }
});