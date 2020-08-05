const {
    unescapePercentEncoding,
    percentEncoding,
    capitalizePercentEncoding,
    decodeUnreservedCharacters,
    convertEmptyPath,
    removeDotSegments,
    removeDuplicateSlashes,
    sortQueryParameters
} = require('./util')

const Url = require('url-parse');

exports.normalize = (url) => {
    if (url === undefined || url === null || url === '') {
        return '';
    }
    
    // trim trailing space
    url = url.replace(/^\s+|\s+$/g, '');
    
    // Remove tab (0x09), CR (0x0d), and LF (0x0a) characters from the URL
    url = url.replace(/[\t\r\n]/g, '');
    
    // default to http if none was provided
    if (null === url.match(/^([^:/?#]+):/i)) {
        url = 'http://' + url;
    }
    
    url = new Url(url);
    
    url.hash = ''; // Remove the fragment
    
    url.set(
        'hostname',
        url.hostname 
          .replace(/^\.+|\.+$/g, '') // Remove all leading and trailing dots.
          .replace(/\.+/g, '.') // Replace consecutive dots with a single dot.
          .toLowerCase() //Lowercase the whole string.
    );
    
    for (prop of ['host', 'pathname', 'query']) {
        // Percent-unescape the URL until it has no more percent-escapes
        url[prop] = unescapePercentEncoding(url[prop]);
        url[prop] = decodeUnreservedCharacters(url[prop]);
    }
    
    url.pathname = removeDotSegments(url.pathname);
    url.pathname = removeDuplicateSlashes(url.pathname);
    url.pathname = convertEmptyPath(url.pathname);
    
    url.query =  sortQueryParameters(url.query);
    
    for (prop of ['host', 'pathname', 'query']) {
        url[prop] = percentEncoding(url[prop]);
        url[prop] = capitalizePercentEncoding(url[prop]);
    }
    
    return url.toString();
}