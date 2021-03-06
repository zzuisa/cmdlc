let jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const config = require('../../../config/config');
const { T } = require('../../models/entity/R');
const tools = require('../../utils/tool');
const { C } = require('../../utils/constant');

let R = new T();
let { secretOrPrivateKey } = config;

module.exports = (app) => {
    app.post('/api/login', (req, res, next) => {
        const user = new User({
            // Todo
            id: 0, // needs to be changed
            name: req.body.username,
            password: req.body.password,

        });
        // this.props.history.push('/main');
        // find Test
        User.findOne({ name: req.body.username, password: req.body.password }, (err, doc) => {
            if (err) {
                res.json(R.error());
            } else if (doc != null) {
                const flag = true;
                // let pageUserinfo = doc;
                res.json(R.ok({
                    token: jwt.sign({
                        name: 'BinMaing',
                        data: '=============',
                    }, secretOrPrivateKey, {
                        expiresIn: '24h',
                    }),
                    doc,
                }));
            } else {
                res.json(R.error(101, C[101]));
            }
        })
            .catch((err) => next(err));
    });

    app.post('/api/register', (req, res, next) => {
        const user = new User({
            // Todo
            id: 0, // needs to be changed
            name: req.body.name,
            password: req.body.password,
            type: req.body.identity,
            avatar: `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${req.body.name}`,
            email: req.body.email,
            create_time: req.body.create_time,
            update_time: null,
            delete_time: null,
            team: req.body.team,
            channels: req.body.channels,

        });

        user.save()
            .then(() => {
                res.json(R.ok(user));
            })
            // .then(() => res.json(user))

            .catch((err) => next(err));
    });

    app.post('/api/modifyPsd', (req, res, next) => {
        let conditions = { name: req.body.currentUser.name, email: req.body.currentUser.email };
        let update = { $set: { password: req.body.newpsd } };
        User.findOneAndUpdate(conditions, update, (error, data) => {
            if (error) {

            } else if (!data) {

            } else if (data) {
                // return data to front-end
                res.json(data);
            }
        });

        // .then(() => res.json(user))
    });

    app.post('/api/modifyProfile', (req, res, next) => {
        let conditions = { name: req.body.currentUser.name, password: req.body.currentUser.password };
        let update = { $set: { name: req.body.newName, email: req.body.newEmail } };
        User.findOneAndUpdate(conditions, update, { new: true }, (error, data) => {
            if (error) {

            } else if (!data) {
                res.json(R.error());
            } else if (data) {
                let doc = data;
                res.json(R.ok({
                    doc,
                }));
            }
        });
    });

    app.post('/api/sendMail', (req, res, next) => {
        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            port: 25,
            secure: false,
            auth: {
                user: '495032732@qq.com',
                pass: 'pxdonvbzqryvcbda',

            },
        });
        const verifyCode = Math.random().toString(10).slice(-5);
        let response = {
            verify: verifyCode,
            message: 'mail success',
        };
        let mailOptions = {

            from: '"Noder Team " <495032732@qq.com>',
            to: req.body.email,
            subject: 'Password reset ',
            text: `Your current verification code is: ${verifyCode}`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                res.json(R.error());
                return;
            }

            res.json(R.ok({
                token: jwt.sign({
                    name: 'BinMaing',
                    data: '=============',
                }, secretOrPrivateKey, {
                    expiresIn: '24h',
                }),
                response,
            }));
        });
    });

    app.post('/api/findOneUser', (req, res, next) => {
        User.findOne({ email: req.body.email }, (err, doc) => {
            if (err) {

            } else if (doc != null) {
                res.json(R.ok({
                    token: jwt.sign({
                        name: 'BinMaing',
                        data: '=============',
                    }, secretOrPrivateKey, {
                        expiresIn: '24h',
                    }),
                    doc,
                }));
            } else {
                res.json(R.error());
            }
        })
            .catch((err) => next(err));
    });
    app.post('/api/forgetPsd', (req, res, next) => {
        let conditions = { email: req.body.email };
        let update = { $set: { password: req.body.newPassword } }; //
        User.findOneAndUpdate(conditions, update, (error, data) => {
            if (error) {
                res.json(R.error());
            } else if (data) {
                // return data to front-end
                res.json(data);
            }
        });

        // .then(() => res.json(user))
    });
};
