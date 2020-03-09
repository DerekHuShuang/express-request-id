'use strict';

var uuid = require('uuid');

module.exports = function (options) {
    options = options || {};
    options.uuidVersion = options.uuidVersion || 'v4';
    options.setHeader = options.setHeader === undefined || !!options.setHeader;
    options.setReqHeader = options.setReqHeader === undefined || !!options.setReqHeader;
    options.headerName = options.headerName || 'X-Request-Id';
    options.attributeName = options.attributeName || 'id';

    return function (req, res, next) {
        req[options.attributeName] = req.headers[options.headerName.toLowerCase()] || uuid[options.uuidVersion](options, options.buffer, options.offset);
        if(options.setReqHeader && !req.headers[options.headerName.toLowerCase()]){
            req.headers[options.headerName.toLowerCase()] = req[options.attributeName];
        }
        if (options.setHeader) {
            res.setHeader(options.headerName, req[options.attributeName]);
        }
        next();
    };
};
