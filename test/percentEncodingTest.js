'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {percentEncoding} = require('../src/util');

const expectedTests = new Map([
    ['/ab#cd', '/ab%23cd'],
    [' ', '%20'],
    ['\x01\x80', '%01%80'],
]);

describe('percentEncoding', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(percentEncoding(test)).to.equal(expected)
        })
    }
});