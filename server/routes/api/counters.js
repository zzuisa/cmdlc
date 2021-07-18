const Counter = require('../../models/Counter');
const { T } = require('../../models/entity/R');
const tools = require('../../utils/tool');

let R = new T();
const { C } = require('../../utils/constant');

module.exports = (app) => {
    app.get('/api/counters', (req, res, next) => {
        let authorization = req.get('Authorization');
        if (tools.verifyToken(authorization, res)) {
            Counter.find()
                .exec()
                .then((counter) => res.json(counter))
                .catch((err) => next(err));
        } else {
            res.json(R.error(301, C[301]));
        }
    });
};
