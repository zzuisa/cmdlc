const User = require('../../models/User');

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
        User.find({ name: req.body.username, password: req.body.password }, (err, doc) => {
            if (err) {
                console.log(err.message);
            } else {
                console.log(doc);
                if (doc.length > 0) {
                    const flag = true;
                    // this.props.history.push('/main');
                    res.json(flag);
                } else {
                    res.json(false);
                }
                // let response = {
                //     code: 200,
                //     message: '用户注册成功！',
                // };
                // res.json(response);
            }
        })
            .catch((err) => next(err));
    });
};
