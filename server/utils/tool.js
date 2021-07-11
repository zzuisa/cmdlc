const multer = require('multer');
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');
let jwt = require('jsonwebtoken');
const { T } = require('../models/entity/R');
const config = require('../../config/config');
const { C } = require('./constant');

let { secretOrPrivateKey } = config;

let R = new T();
let tools = {
    multer() {
        let storage = multer.diskStorage({
            destination: async(req, file, cb) => {
                let day = sd.format(new Date(), 'YYYYMMDD');
                let dir = path.join('static/upload', day);

                await mkdirp(dir);

                cb(null, dir);
            },
            filename(req, file, cb) {
                let extname = path.extname(file.originalname);
                cb(null, Date.now() + extname);
            },
        });
        let upload = multer({ storage });
        return upload;
    },
    md5() { },

    verifyToken(authorization, res) {
        if (authorization === undefined) {
            res.json(R.error(301, C[301]));
            return false;
        }
        let token = authorization.split(' ')[1];
        jwt.verify(token, secretOrPrivateKey, (err, decode) => {
            if (err) {
                res.json(R.error(301, C[301]));
            }
        });
        return R.ok(token);
    },
};

module.exports = tools;
