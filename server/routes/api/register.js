const User = require('../../models/User');

module.exports = (app) => {
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
            .then(() => res.json(user))
            .catch((err) => next(err));
    });
};
