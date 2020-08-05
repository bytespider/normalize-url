const Url = require('url-parse');

module.exports = {
    'unescapePercentEncoding': unescapePercentEncoding,
    'percentEncoding': percentEncoding,
    'capitalizePercentEncoding': capitalizePercentEncoding,
    'decodeUnreservedCharacters': decodeUnreservedCharacters,
    'convertEmptyPath': convertEmptyPath,
    'removeDotSegments': removeDotSegments,
    'removeDuplicateSlashes': removeDuplicateSlashes,
    'sortQueryParameters': sortQueryParameters,
};

const percentEncodingRegex = /(?:%[A-Fa-f0-9]{2})/g;
const encodeCharactersRegex = /([^\x21-\x7E]|#|%)/g;
const decodeUnreservedCharactersRegex = /%(?:2D|2E|5F|7E|3[0-9]|[46][1-9A-F]|[57][0-9A])/gi;
const removeDuplicateSlashesRegex = /\/\/+/gi;

function unescapePercentEncoding(str) {
    let matches = str.match(percentEncodingRegex);
    
    while(str.match(percentEncodingRegex) !== null) {
        str = str.replace(percentEncodingRegex, match => String.fromCodePoint(match.replace('%', '0x')));
    }
    
    return str;
}

function percentEncoding(str) {
    return str.replace(encodeCharactersRegex, match => '%' + match.charCodeAt(0).toString(16).padStart(2, 0));
}

function capitalizePercentEncoding(str) {
    return str.replace(percentEncodingRegex, match => match.toUpperCase());
}

function decodeUnreservedCharacters(str) {
    return str.replace(decodeUnreservedCharactersRegex, decodeURIComponent);
}

function convertEmptyPath(path) {
    if (path === '') {
        path = '/';
    }
    
    return path == '' ? '/' : path;
}

function removeDotSegments(path) {
    if (path === '' || path === '/') {
        return path;
    }
    
    let result = [];
    let segments =  path.split('/');
    
    for (let segment of segments) {
        if (segment === '..') {
            result.pop();
        } else if (segment !== '.') {
            result.push(segment);
        }
    }
    
    return result.join('/');
}

function removeDuplicateSlashes(path) {
    return path.replace(removeDuplicateSlashesRegex, '/');
}

function sortQueryParameters(query) {
    if (query.length) {
        let searchParams = new URLSearchParams(query);
        searchParams.sort();
    
        let search = [];
        for(var [key, value] of searchParams) {
            search.push(key + ((undefined === value || null === value || '' === value) ? '' : '=' + value));
        }
    
        query = '?' + search.join('&');
    }
    
    return query;
}