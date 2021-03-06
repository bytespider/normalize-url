'use strict'

const {describe, it} = require('mocha');
const {expect} = require('chai');

const { normalize } = require('../src/normalize-url');

const expectedTests = new Map([
    ["http://host/%25%32%35", "http://host/%25"],
    ["http://host/%25%32%35%25%32%35", "http://host/%25%25"],
    ["http://host/%2525252525252525", "http://host/%25"],
    ["http://host/asdf%25%32%35asd", "http://host/asdf%25asd"],
    ["http://host/%%%25%32%35asd%%", "http://host/%25%25%25asd%25%25"],
    ["http://www.google.com/", "http://www.google.com/"],
    ["http://%31%36%38%2e%31%38%38%2e%39%39%2e%32%36/%2E%73%65%63%75%72%65/%77%77%77%2E%65%62%61%79%2E%63%6F%6D/", "http://168.188.99.26/.secure/www.ebay.com/"],
    ["http://195.127.0.11/uploads/%20%20%20%20/.verify/.eBaysecure=updateuserdataxplimnbqmn-xplmvalidateinfoswqpcmlx=hgplmcx/", "http://195.127.0.11/uploads/%20%20%20%20/.verify/.eBaysecure=updateuserdataxplimnbqmn-xplmvalidateinfoswqpcmlx=hgplmcx/"],
    ["http://host%23.com/%257Ea%2521b%2540c%2523d%2524e%25f%255E00%252611%252A22%252833%252944_55%252B", "http://host%23.com/~a!b@c%23d$e%25f^00&11*22(33)44_55+"],
    // ["http://3279880203/blah", "http://195.127.0.11/blah"], // cant handle this currently
    ["http://www.google.com/blah/..", "http://www.google.com/"],
    ["www.google.com/", "http://www.google.com/"],
    ["www.google.com", "http://www.google.com/"],
    ["http://www.evil.com/blah#frag", "http://www.evil.com/blah"],
    ["http://www.GOOgle.com/", "http://www.google.com/"],
    ["http://www.google.com.../", "http://www.google.com/"],
    ["http://www.google.com/foo\tbar\rbaz\n2", "http://www.google.com/foobarbaz2"],
    ["http://www.google.com/q?", "http://www.google.com/q?"],
    ["http://www.google.com/q?r?", "http://www.google.com/q?r?"],
    ["http://www.google.com/q?r?s", "http://www.google.com/q?r?s"],
    ["http://evil.com/foo#bar#baz", "http://evil.com/foo"],
    ["http://evil.com/foo;", "http://evil.com/foo;"],
    ["http://evil.com/foo?bar;", "http://evil.com/foo?bar;"],
    ["http://\x01\x80.com/", "http://%01%80.com/"],
    ["http://notrailingslash.com", "http://notrailingslash.com/"],
    ["  http://www.google.com/  ", "http://www.google.com/"],
    ["http:// leadingspace.com/", "http://%20leadingspace.com/"],
    ["http://%20leadingspace.com/", "http://%20leadingspace.com/"],
    ["https://www.securesite.com/", "https://www.securesite.com/"],
    ["http://host.com/ab%23cd", "http://host.com/ab%23cd"],
    ["http://host.com//twoslashes?more//slashes", "http://host.com/twoslashes?more//slashes"],
    ["http://www.google.com:80", "http://www.google.com/"],
]);

describe('normalize', () => {
    for (let [test, expected] of expectedTests) {
        it(`${test} === ${expected}`, () => {
            // expect(normalizeUrl(test).toString()).to.equal(expected)
            expect(normalize('' + test)).to.equal(expected)
        })
    }
});