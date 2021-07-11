let jwt = require('jsonwebtoken');
const User = require('../../models/User');
const config = require('../../../config/config');

let { secretOrPrivateKey } = config;

module.exports = (app) => {
    app.post('/api/login', (req, res, next) => {
        const user = new User({

            // Todo

            id: 0, // needs to be changed
            name: req.body.username,
            password: req.body.password,

        });
        console.log(req);
        // this.props.history.push('/main');

        // find Test
        User.findOne({ name: req.body.username, password: req.body.password }, (err, doc) => {
            if (err) {
                console.log(err.message);
            } else if (doc != null) {
                const flag = true;
                // let pageUserinfo = doc;
                console.log('log success');
                res.json({
                    result: 'ok',
                    token: jwt.sign({
                        name: 'BinMaing',
                        data: '=============',
                    }, secretOrPrivateKey, {
                        expiresIn: '24h',
                    }),
                    flag,
                    doc,

                });
            } else {
                console.log('log failes');
                res.json(false);
            }
        })
            .catch((err) => next(err));
    });

    app.post('/api/register', (req, res, next) => {
        console.log(req);
        const user = new User({

            // Todo

            id: 0, // needs to be changed
            name: req.body.name,
            password: req.body.password,
            type: req.body.identity,
            avatar: null,
            email: req.body.email,
            create_time: req.body.create_time,
            update_time: null,
            delete_time: null,
            team: req.body.team,
            channels: req.body.channels,

        });

        user.save()
            .then(() => {
                let response = {
                    code: 200,
                    message: 'New user register success！',
                };
                res.json(response);
            })
            // .then(() => res.json(user))

            .catch((err) => next(err));
    });
};
