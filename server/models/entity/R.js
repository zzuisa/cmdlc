/* eslint-disable class-methods-use-this */
/**
 * Return codes:
 * 0 success
 * 101 wrong username or password
 * 201 username is exist
 * 301 Credential expired, please log in again
 * 401 Illegal users
 * 403 JsonWebTokenError
 * 501 server error
 */
const { C } = require('../../utils/constant');

exports.T = class R {
    constructor(code, content) {
        this.code = code;
        this.content = content || null;
    }

    ok(content) {
        return new R(0, content);
    }

    error(code, content) {
        if (code === undefined && content === undefined) {
            return new R(501, C[501]);
        }
        return new R(code, content || 'bad request');
    }
};
