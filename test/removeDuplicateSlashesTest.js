'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {removeDuplicateSlashes} = require('../src/util');

const expectedTests = new Map([
    ['/foo//', '/foo/'],
    ['/foo///bar//', '/foo/bar/'],
]);

describe('removeDuplicateSlashes', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(removeDuplicateSlashes(test)).to.equal(expected)
        })
    }
});