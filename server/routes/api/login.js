const User = require('../../models/User');

module.exports = (app) => {
    app.post('/api/login', (req, res, next) => {
        const user = new User({

            // Todo

            id: 0, // needs to be changed
            name: req.body.username,
            password: req.body.password,

        });

        user.save()
            .then(() => res.json(user))
            .catch((err) => next(err));
    });

    // app.get('/api/login', (req, res, next) => {
    //     const user = new User({
    //         id: 0, // needs to be changed
    //         name: res.username,
    //         password: res.password,
    //     });
    //     console.log(`req${req}  ``res${res}`);
    //     user.save()
    //         .then(() => res.json(user))
    //         .catch((err) => next(err));
    // });
};
