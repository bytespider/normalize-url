'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const {decodeUnreservedCharacters} = require('../src/util');

const expectedTests = new Map([
    ['%7Ejane', '~jane'],
    ['/foo?bar;', '/foo?bar;'],
]);

describe('decodeUnreservedCharacters', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            expect(decodeUnreservedCharacters(test)).to.equal(expected)
        })
    }
});