/**
 * 0 success
 * 101 wrong username or password
 * 201 Username already exists
 * 301 Credential expired, please log in again
 * 401 Illegal users
 * 403 JsonWebTokenError
 * 501 server error
 */

exports.C = {
    101: 'Wrong username or password!',
    201: 'Username already exists!',
    301: 'Credential expired, please log in again!',
    401: 'Illegal users!',
    501: 'Server error...',
};
