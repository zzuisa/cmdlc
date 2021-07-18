const fileUpload = require('express-fileupload');
const moment = require('moment');
const formidable = require('express-formidable');
let express = require('express');
let bodyParser = require('body-parser');
const Common = require('../../models/Common');
const Slide = require('../../models/Slide');
const { T } = require('../../models/entity/R');
const { C } = require('../../utils/constant');

let R = new T();

module.exports = (app) => {
    app.use(fileUpload({
        createParentPath: true,
        parseNested: true,
    }));
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(bodyParser.json());
    app.get('/api/commons', (req, res, next) => {
        Common.find()
            .exec()
            .then((slide) => res.json(slide))
            .catch((err) => next(err));
    });

    app.post('/api/commons/:type', (req, res) => {
        const files = req.files.file;
        let sampleFile;
        let uploadPath;
        let method = req.params.type;
        let { userInfo } = req.body;

        if (userInfo === undefined) {
            return res.json(R.error(501, C[501]));
        }
        let user = JSON.parse(userInfo);
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }
        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        sampleFile = req.files.file;

        let ss = sampleFile.name.split('.');
        let suffix = ss[ss.length - 1];
        let date = moment.utc().format();
        let local = moment.utc(date).local().format('YYYY-MM-DD HHmmss');
        let finalName = `${local}.${suffix}`;
        uploadPath = `./dist/files/${finalName}`;

        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(uploadPath, (err) => {
            if (err) {
                console.log('err', err);
                return res.status(500).send(err);
            }
            let sType = 0 ? method == 'lecture' : 1;
            const slide = new Slide({
                user_id: user.name,
                user_avatar: user.avatar,
                name: sampleFile.name,
                type: sType,
                path: `/files/${finalName}`,
                topic: req.body.topic,
            });

            slide.save()
                .then(() => res.json(slide));
            res.send({ code: 0, content: uploadPath });
        });
    });
};
