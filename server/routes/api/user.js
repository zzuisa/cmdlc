let jwt = require('jsonwebtoken');
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
        // const user = new User({
        //     // Todo
        //     id: 0, // needs to be changed
        //     name: req.body.name,
        //     password: req.body.password,
        //     type: req.body.identity,
        //     avatar: `https://eu.ui-avatars.com/api/?background=0D8ABC&color=fff&name=${req.body.name}`,
        //     email: req.body.email,
        //     create_time: req.body.create_time,
        //     update_time: null,
        //     delete_time: null,
        //     team: req.body.team,
        //     channels: req.body.channels,

        // });

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
        console.log(`修改档案${req.body.newName}`);
        let conditions = { name: req.body.currentUser.name, password: req.body.currentUser.password };
        let update = { $set: { name: req.body.newName, email: req.body.newEmail } }; // $set 表示只修改 age，否则全覆盖
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
