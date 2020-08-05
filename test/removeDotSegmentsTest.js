'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {removeDotSegments} = require('../src/util');

const expectedTests = new Map([
    ['/a/../a/b', '/a/b'],
    ['/a/./b', '/a/b'],
]);

describe('removeDotSegments', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(removeDotSegments(test)).to.equal(expected)
        })
    }
});