let jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../../models/User');
const config = require('../../../config/config');
const { T } = require('../../models/entity/R');
const tools = require('../../utils/tool');

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
                res.json(R.error());
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
        let update = { $set: { password: req.body.newpsd } }; // $set 表示只修改 age，否则全覆盖
        User.findOneAndUpdate(conditions, update, (error, data) => {
            console.log(conditions);
            if (error) {
                console.log(error);
            } else if (!data) {
                console.log('no data in DB');
            } else if (data) {
                console.log('update success');
                console.log(data);
                // return data to front-end
                res.json(data);
            }
        });

        // .then(() => res.json(user))
    });

    app.post('/api/modifyProfile', (req, res, next) => {
        // console.log(`修改档案${req.body.newName}`);
        let conditions = { name: req.body.currentUser.name, password: req.body.currentUser.password };
        let update = { $set: { name: req.body.newName, email: req.body.newEmail } }; // $set 表示只修改 age，否则全覆盖
        User.findOneAndUpdate(conditions, update, { new: true }, (error, data) => {
            console.log(conditions);
            if (error) {
                console.log(error);
            } else if (!data) {
                console.log('no data in DB');
                res.json(R.error());
            } else if (data) {
                console.log('update success');
                console.log(`更新${data}`);
                let doc = data;
                res.json(R.ok({
                    token: jwt.sign({
                        name: 'BinMaing',
                        data: '=============',
                    }, secretOrPrivateKey, {
                        expiresIn: '24h',
                    }),
                    doc,
                }));

                // return data to front-end
                // User.findOne({ name: data.name, password: data.password }, (err, doc) => {
                //     if (err) {
                //         console.log('error here');
                //     } else if (doc != null) {
                //         console.log('执行findOne');
                //         // let pageUserinfo = doc;
                //         console.log(`更新后${doc}`);
                //         res.json(R.ok({
                //             token: jwt.sign({
                //                 name: 'BinMaing',
                //                 data: '=============',
                //             }, secretOrPrivateKey, {
                //                 expiresIn: '24h',
                //             }),
                //             doc,
                //         }));
                //     } else {
                //         res.json(R.error());
                //     }
                // })
                //     .catch((err) => next(err));
            }
        });

        // .then(() => res.json(user))
    });

    app.post('/api/sendMail', (req, res, next) => {
        console.log('mail调用');
        console.log(req.body.email);

        // 创建一个SMTP客户端对象
        let transporter = nodemailer.createTransport({
            host: 'smtp.qq.com',
            // service: 'qq', // 使用了内置传输发送邮件 查看支持列表：https://nodemailer.com/smtp/well-known/
            port: 25, // SMTP 端口
            secure: false, // 使用了 SSL
            auth: {
                user: '495032732@qq.com',
                // qq
                pass: 'pxdonvbzqryvcbda',

            },
        });
        const verifyCode = Math.random().toString(10).slice(-5);
        console.log(`随机数${verifyCode}`);
        let response = {

            verify: verifyCode,
            message: 'mail success',
        };
        // 创建邮件对象
        let mailOptions = {

            from: '"Noder Team " <495032732@qq.com>', // sender address
            to: req.body.email, // list of receivers
            subject: 'Password reset ', // Subject line
            // 发送text或者html格式
            text: `Your current verification code is: ${verifyCode}`, // plain text body
            // html: '<b>Hello world?</b>', // html body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('error occurs');
                res.json(R.error());
                return console.log(error);
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

            console.log('mail sent:', info.response);
        });
    });

    app.post('/api/findOneUser', (req, res, next) => {
        console.log('findOneUser方法');

        // find Test
        User.findOne({ email: req.body.email }, (err, doc) => {
            if (err) {
                console.log(`err is : ${err}`);
            } else if (doc != null) {
                // let pageUserinfo = doc;
                console.log(doc);
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
        let update = { $set: { password: req.body.newPassword } }; // $set 表示只修改 age，否则全覆盖
        User.findOneAndUpdate(conditions, update, (error, data) => {
            console.log(conditions);
            if (error) {
                console.log(error);
            } else if (!data) {
                console.log('no data in DB');
            } else if (data) {
                console.log('update success');
                console.log(data);
                // return data to front-end
                res.json(data);
            }
        });

        // .then(() => res.json(user))
    });
};
