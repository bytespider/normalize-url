'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {convertEmptyPath} = require('../src/util');

const expectedTests = new Map([
    ['', '/'],
    ['/foo', '/foo'],
]);

describe('convertEmptyPath', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(convertEmptyPath(test).toString()).to.equal(expected)
        })
    }
});