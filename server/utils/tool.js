const multer = require('multer');
const path = require('path');
const sd = require('silly-datetime');
const mkdirp = require('mkdirp');

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
};

module.exports = tools;
