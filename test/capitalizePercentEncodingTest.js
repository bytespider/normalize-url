'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {capitalizePercentEncoding} = require('../src/util');

const expectedTests = new Map([
    ['%5c', '%5C'],
    ['%C7', '%C7'],
]);

describe('capitalizePercentEncoding', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(capitalizePercentEncoding(test).toString()).to.equal(expected)
        })
    }
});