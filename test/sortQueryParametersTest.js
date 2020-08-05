'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {sortQueryParameters} = require('../src/util');

const expectedTests = new Map([
    ['?b&a', '?a&b'],
]);

describe('sortQueryParameters', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(sortQueryParameters(test)).to.equal(expected)
        })
    }
});